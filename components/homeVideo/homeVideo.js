import { useRef } from "react";
import styles from "../../styles/homeVideo.module.css";

export default function HomeVideo() {
  const sectionRef = useRef(null);

  const scrollPastVideo = () => {
    if (!sectionRef.current) return;

    const sectionTop = sectionRef.current.offsetTop;
    const sectionHeight = sectionRef.current.offsetHeight;

    window.scrollTo({
      top: sectionTop + sectionHeight,
      behavior: "smooth",
    });
  };

  return (
    <section
      ref={sectionRef}
      className={styles.videoSection}
      aria-label="Hörselservice introduktionsvideo"
    >
      <video
        className={styles.video}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/videos/poster.webp"
      >
        <source
          src="/videos/video-mobile.mp4"
          type="video/mp4"
          media="(max-width: 768px)"
        />
        <source src="/videos/video.mp4" type="video/mp4" />
      </video>

      <div className={styles.overlay} />

      <div className={styles.content}>
        <h1 className={styles.title}>Formgjutna hörselskydd och ljudutjämnings{"\u00AD"}system för alla miljöer</h1>
      </div>

      <button
        type="button"
        className={styles.scrollButton}
        onClick={scrollPastVideo}
        aria-label="Scrolla vidare till innehållet"
      >
        <span className={styles.scrollText}>Scrolla vidare</span>
        <span className={styles.scrollMouse} aria-hidden="true">
          <span className={styles.scrollDot} />
        </span>
      </button>
    </section>
  );
}