import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { createSupabaseBrowserClient } from "../../../lib/supabase/browserClient";
import styles from "../../../styles/mfaSetup.module.css";

export default function MfaSetup() {
  const router = useRouter();

  const [factorId, setFactorId] = useState("");

  const [qrCode, setQrCode] = useState("");

  const [secret, setSecret] = useState("");

  const [code, setCode] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const [isLoading, setIsLoading] = useState(true);

  const [isVerifying, setIsVerifying] = useState(false);

  const enrollmentStarted = useRef(false);

  useEffect(() => {
    if (enrollmentStarted.current) {
      return;
    }

    enrollmentStarted.current = true;

    async function startEnrollment() {
      try {
        const supabase = createSupabaseBrowserClient();

        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!session) {
          await router.replace("/admin/login");
          return;
        }

        const { data: aalData, error: aalError } =
          await supabase.auth.mfa.getAuthenticatorAssuranceLevel();

        if (aalError) {
          throw aalError;
        }

        /*
         * Användare har redan MFA
         * registrerad.
         */
        if (aalData.nextLevel === "aal2") {
          await router.replace("/admin/mfa");
          return;
        }

        const { data, error } = await supabase.auth.mfa.enroll({
          factorType: "totp",
          friendlyName: "Hörselservice Admin",
        });

        if (error) {
          throw error;
        }

        setFactorId(data.id);

        setQrCode(data.totp.qr_code);

        setSecret(data.totp.secret);
      } catch (error) {
        console.error("MFA enrollment failed:", error);

        setErrorMessage("Det gick inte att starta MFA-registreringen.");
      } finally {
        setIsLoading(false);
      }
    }

    startEnrollment();
  }, [router]);

  async function handleSubmit(event) {
    event.preventDefault();

    if (isVerifying || !factorId) {
      return;
    }

    const normalizedCode = code.replace(/\s/g, "");

    if (!/^\d{6}$/.test(normalizedCode)) {
      setErrorMessage("Ange den sexsiffriga koden från autentiseringsappen.");

      return;
    }

    try {
      setIsVerifying(true);
      setErrorMessage("");

      const supabase = createSupabaseBrowserClient();

      const { error } = await supabase.auth.mfa.challengeAndVerify({
        factorId,
        code: normalizedCode,
      });

      if (error) {
        setErrorMessage(
          "Koden är inte giltig. Kontrollera koden och försök igen.",
        );

        return;
      }

      await router.replace("/admin");
    } catch (error) {
      console.error("MFA verification failed:", error);

      setErrorMessage("Det gick inte att verifiera koden.");
    } finally {
      setIsVerifying(false);
    }
  }

  if (isLoading) {
    return <p role="status">Förbereder tvåstegsverifiering...</p>;
  }

  if (!factorId) {
    return (
      <div role="alert">{errorMessage || "MFA kunde inte förberedas."}</div>
    );
  }

  return (
    <div className={styles.container}>
      <p className={styles.instructions}>
        Skanna QR-koden med exempelvis Microsoft Authenticator eller Google
        Authenticator.
      </p>

      {qrCode ? (
        <div className={styles.qrContainer}>
          <img
            className={styles.qrCode}
            src={qrCode}
            alt="QR-kod för tvåstegsverifiering"
          />
        </div>
      ) : null}

      {secret ? (
        <div className={styles.secretContainer}>
          <p>
            Om du inte kan skanna QR-koden kan du skriva in denna kod manuellt:
          </p>

          <code className={styles.secret}>{secret}</code>
        </div>
      ) : null}

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="totp-setup-code">
            Kod från autentiseringsappen
          </label>

          <input
            id="totp-setup-code"
            className={styles.input}
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={6}
            value={code}
            onChange={(event) => setCode(event.target.value.replace(/\D/g, ""))}
            disabled={isVerifying}
            required
          />
        </div>

        {errorMessage ? (
          <div className={styles.error} role="alert">
            {errorMessage}
          </div>
        ) : null}

        <button
          type="submit"
          className={styles.submitButton}
          disabled={isVerifying}
        >
          {isVerifying ? "Verifierar..." : "Aktivera MFA"}
        </button>
      </form>
    </div>
  );
}
