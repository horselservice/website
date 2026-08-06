import { useState } from "react";
import { useRouter } from "next/router";

import {
    createSupabaseBrowserClient,
} from "../../../lib/supabase/browserClient";

import styles from "../../../styles/adminLogin.module.css";

export default function LoginForm() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] =
        useState("");

    const [errorMessage, setErrorMessage] =
        useState("");

    const [isSubmitting, setIsSubmitting] =
        useState(false);

    async function handleSubmit(event) {
        event.preventDefault();

        if (isSubmitting) {
            return;
        }

        setErrorMessage("");

        const normalizedEmail =
            email.trim().toLowerCase();

        if (!normalizedEmail || !password) {
            setErrorMessage(
                "Ange e-postadress och lösenord."
            );

            return;
        }

        try {
            setIsSubmitting(true);

            const supabase =
                createSupabaseBrowserClient();

            const { error } =
                await supabase.auth.signInWithPassword({
                    email: normalizedEmail,
                    password,
                });

            if (error) {
                setErrorMessage(
                    "Fel e-postadress eller lösenord."
                );

                return;
            }

            const { data: aalData, error: aalError } =
                await supabase.auth.mfa.getAuthenticatorAssuranceLevel();

            if (aalError) {
                throw aalError;
            }

            // nextLevel === "aal2": användaren har redan en verifierad MFA
            // nextLevel === "aal1": användaren har ännu ingen verifierad faktor och ska registrera en autentiseringsapp.
            if (aalData.nextLevel === "aal2") {
                await router.replace("/admin/mfa");
                return;
            }

            await router.replace("/admin/mfa/setup");
        } catch (error) {
            console.error(
                "Admin login failed:",
                error
            );

            setErrorMessage(
                "Det gick inte att logga in. Försök igen."
            );
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <form
            className={styles.form}
            onSubmit={handleSubmit}
            noValidate
        >
            <div className={styles.field}>
                <label
                    className={styles.label}
                    htmlFor="admin-email"
                >
                    E-postadress
                </label>

                <input
                    id="admin-email"
                    className={styles.input}
                    type="email"
                    name="email"
                    value={email}
                    onChange={(event) =>
                        setEmail(event.target.value)
                    }
                    autoComplete="username"
                    inputMode="email"
                    placeholder="namn@exempel.se"
                    disabled={isSubmitting}
                    required
                />
            </div>

            <div className={styles.field}>
                <label
                    className={styles.label}
                    htmlFor="admin-password"
                >
                    Lösenord
                </label>

                <input
                    id="admin-password"
                    className={styles.input}
                    type="password"
                    name="password"
                    value={password}
                    onChange={(event) =>
                        setPassword(event.target.value)
                    }
                    autoComplete="current-password"
                    disabled={isSubmitting}
                    required
                />
            </div>

            {errorMessage ? (
                <div
                    className={styles.error}
                    role="alert"
                >
                    {errorMessage}
                </div>
            ) : null}

            <button
                className={styles.submitButton}
                type="submit"
                disabled={isSubmitting}
            >
                {isSubmitting
                    ? "Loggar in..."
                    : "Logga in"}
            </button>
        </form>
    );
}