import {
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/router";

import {
  createSupabaseBrowserClient,
} from "../../../lib/supabase/browserClient";

export default function MfaForm() {
  const router = useRouter();

  const [factorId, setFactorId] =
    useState("");

  const [code, setCode] =
    useState("");

  const [errorMessage, setErrorMessage] =
    useState("");

  const [isLoading, setIsLoading] =
    useState(true);

  const [isVerifying, setIsVerifying] =
    useState(false);

  useEffect(() => {
    async function loadMfaFactor() {
      try {
        const supabase =
          createSupabaseBrowserClient();

        const {
          data: { session },
        } =
          await supabase.auth.getSession();

        if (!session) {
          await router.replace(
            "/admin/login"
          );

          return;
        }

        const {
          data: aalData,
          error: aalError,
        } =
          await supabase.auth.mfa
            .getAuthenticatorAssuranceLevel();

        if (aalError) {
          throw aalError;
        }

        /*
         * MFA redan verifierad.
         */
        if (
          aalData.currentLevel === "aal2"
        ) {
          await router.replace(
            "/admin"
          );

          return;
        }

        /*
         * Ingen MFA registrerad.
         */
        if (
          aalData.nextLevel !== "aal2"
        ) {
          await router.replace(
            "/admin/mfa/setup"
          );

          return;
        }

        const {
          data,
          error,
        } =
          await supabase.auth.mfa
            .listFactors();

        if (error) {
          throw error;
        }

        const verifiedTotpFactor =
          data.totp.find(
            (factor) =>
              factor.status ===
              "verified"
          );

        if (!verifiedTotpFactor) {
          await router.replace(
            "/admin/mfa/setup"
          );

          return;
        }

        setFactorId(
          verifiedTotpFactor.id
        );
      } catch (error) {
        console.error(
          "Could not load MFA factor:",
          error
        );

        setErrorMessage(
          "Det gick inte att läsa tvåstegsverifieringen."
        );
      } finally {
        setIsLoading(false);
      }
    }

    loadMfaFactor();
  }, [router]);

  async function handleSubmit(event) {
    event.preventDefault();

    if (
      isVerifying ||
      !factorId
    ) {
      return;
    }

    const normalizedCode =
      code.replace(/\s/g, "");

    if (!/^\d{6}$/.test(normalizedCode)) {
      setErrorMessage(
        "Ange den sexsiffriga koden från autentiseringsappen."
      );

      return;
    }

    try {
      setIsVerifying(true);
      setErrorMessage("");

      const supabase =
        createSupabaseBrowserClient();

      const {
        error,
      } =
        await supabase.auth.mfa
          .challengeAndVerify({
            factorId,
            code: normalizedCode,
          });

      if (error) {
        setErrorMessage(
          "Felaktig kod. Försök igen."
        );

        return;
      }

      const {
        data: aalData,
        error: aalError,
      } =
        await supabase.auth.mfa
          .getAuthenticatorAssuranceLevel();

      if (aalError) {
        throw aalError;
      }

      if (
        aalData.currentLevel !== "aal2"
      ) {
        throw new Error(
          "Session was not upgraded to AAL2."
        );
      }

      await router.replace(
        "/admin"
      );
    } catch (error) {
      console.error(
        "MFA login failed:",
        error
      );

      setErrorMessage(
        "Det gick inte att verifiera koden."
      );
    } finally {
      setIsVerifying(false);
    }
  }

  if (isLoading) {
    return (
      <p role="status">
        Kontrollerar tvåstegsverifiering...
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>
        Tvåstegsverifiering
      </h2>

      <p>
        Öppna din autentiseringsapp och
        ange den sexsiffriga koden.
      </p>

      <label htmlFor="totp-code">
        Verifieringskod
      </label>

      <input
        id="totp-code"
        type="text"
        inputMode="numeric"
        autoComplete="one-time-code"
        maxLength={6}
        value={code}
        onChange={(event) =>
          setCode(
            event.target.value.replace(
              /\D/g,
              ""
            )
          )
        }
        disabled={isVerifying}
        autoFocus
        required
      />

      {errorMessage ? (
        <p role="alert">
          {errorMessage}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={
          isVerifying ||
          !factorId
        }
      >
        {isVerifying
          ? "Verifierar..."
          : "Verifiera"}
      </button>
    </form>
  );
}