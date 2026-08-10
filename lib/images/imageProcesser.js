const TARGET_FILE_SIZE = 480_000;
const MAX_WIDTH = 1000;
const MAX_HEIGHT = 1000;

const START_QUALITY = 0.86;
const MIN_QUALITY = 0.5;
const QUALITY_STEP = 0.06;
const SCALE_STEP = 0.9;

function getScaledDimensions(
  width,
  height,
  maxWidth,
  maxHeight
) {
  const scale = Math.min(
    1,
    maxWidth / width,
    maxHeight / height
  );

  return {
    width: Math.round(width * scale),
    height: Math.round(height * scale),
  };
}

function canvasToWebp(canvas, quality) {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(
            new Error(
              "Bilden kunde inte komprimeras."
            )
          );

          return;
        }

        if (blob.type !== "image/webp") {
          reject(
            new Error(
              "Webbläsaren kunde inte konvertera bilden till WebP."
            )
          );

          return;
        }

        resolve(blob);
      },
      "image/webp",
      quality
    );
  });
}

export async function processImage(
  file,
  {
    maxWidth = MAX_WIDTH,
    maxHeight = MAX_HEIGHT,
    maxBytes = TARGET_FILE_SIZE,
  } = {}
) {
  if (!file) {
    throw new Error("Ingen bild har valts.");
  }

  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
  ];

  if (!allowedTypes.includes(file.type)) {
    throw new Error(
      "Bilden måste vara JPEG, PNG eller WebP."
    );
  }

  const bitmap = await createImageBitmap(file);

  try {
    let { width, height } =
      getScaledDimensions(
        bitmap.width,
        bitmap.height,
        maxWidth,
        maxHeight
      );

    for (let resizeRound = 0;
      resizeRound < 12;
      resizeRound += 1) {
      const canvas =
        document.createElement("canvas");

      canvas.width = width;
      canvas.height = height;

      const context =
        canvas.getContext("2d");

      if (!context) {
        throw new Error(
          "Bilden kunde inte behandlas."
        );
      }

      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = "high";

      context.drawImage(
        bitmap,
        0,
        0,
        width,
        height
      );

      for (
        let quality = START_QUALITY;
        quality >= MIN_QUALITY;
        quality -= QUALITY_STEP
      ) {
        const blob =
          await canvasToWebp(
            canvas,
            quality
          );

        if (blob.size <= maxBytes) {
          const baseName =
            file.name.replace(
              /\.[^/.]+$/,
              ""
            );

          return {
            file: new File(
              [blob],
              `${baseName}.webp`,
              {
                type: "image/webp",
                lastModified: Date.now(),
              }
            ),
            width,
            height,
            originalSize: file.size,
            compressedSize: blob.size,
          };
        }
      }

      width = Math.round(
        width * SCALE_STEP
      );

      height = Math.round(
        height * SCALE_STEP
      );

      if (
        width < 320 ||
        height < 320
      ) {
        break;
      }
    }

    throw new Error(
      "Bilden kunde inte komprimeras till under 500 KB."
    );
  } finally {
    bitmap.close();
  }
}