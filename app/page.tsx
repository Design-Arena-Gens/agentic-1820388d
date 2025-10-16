"use client";

import { FormEvent, useMemo, useState } from "react";

type FormState = {
  email: string;
  password: string;
};

type Errors = Partial<Record<keyof FormState, string>>;

export default function Home() {
  const [form, setForm] = useState<FormState>({ email: "", password: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);

  const fieldIds = useMemo(
    () => ({
      email: "login-email",
      password: "login-password"
    }),
    []
  );

  const errorIds = useMemo(
    () => ({
      email: "login-email-error",
      password: "login-password-error"
    }),
    []
  );

  const validate = (state: FormState): Errors => {
    const nextErrors: Errors = {};

    if (!state.email.trim()) {
      nextErrors.email = "Please enter your email or username.";
    }

    if (!state.password.trim()) {
      nextErrors.password = "Please enter your password.";
    } else if (state.password.length < 8) {
      nextErrors.password = "Password must be at least 8 characters.";
    }

    return nextErrors;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);
    setSubmitted(true);

    if (Object.keys(nextErrors).length === 0) {
      // Placeholder authentication simulation.
      alert("Successfully authenticated.");
    }
  };

  const updateField =
    (field: keyof FormState) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [field]: event.target.value }));
      if (submitted) {
        setErrors(validate({ ...form, [field]: event.target.value }));
      }
    };

  return (
    <main className="page-shell" aria-labelledby="login-heading">
      <div className="ambient-overlay" aria-hidden="true" />
      <section className="login-card" role="form">
        <header className="card-header">
          <h1 id="login-heading">Welcome Back</h1>
          <p className="card-subtitle">
            Enter your credentials to continue your journey.
          </p>
        </header>

        <form className="login-form" onSubmit={handleSubmit} noValidate>
          <div className="input-field">
            <label htmlFor={fieldIds.email}>Email or Username</label>
            <input
              id={fieldIds.email}
              type="text"
              name="email"
              autoComplete="username"
              aria-describedby={
                errors.email ? errorIds.email : undefined
              }
              aria-invalid={Boolean(errors.email)}
              value={form.email}
              onChange={updateField("email")}
            />
            <span
              id={errorIds.email}
              className="error-text"
              role="alert"
              aria-live="assertive"
            >
              {errors.email ?? "\u00A0"}
            </span>
          </div>

          <div className="input-field">
            <label htmlFor={fieldIds.password}>Password</label>
            <input
              id={fieldIds.password}
              type="password"
              name="password"
              autoComplete="current-password"
              aria-describedby={
                errors.password ? errorIds.password : undefined
              }
              aria-invalid={Boolean(errors.password)}
              value={form.password}
              onChange={updateField("password")}
            />
            <span
              id={errorIds.password}
              className="error-text"
              role="alert"
              aria-live="assertive"
            >
              {errors.password ?? "\u00A0"}
            </span>
          </div>

          <div className="form-footer">
            <a className="forgot-link" href="#forgot-password">
              Forgot Password?
            </a>
            <button type="submit" className="primary-button">
              Login
            </button>
          </div>
        </form>
      </section>
      <footer className="page-footer" aria-label="Inspirational quote">
        <div className="calligraphy" aria-hidden="true" />
        <p>
          &ldquo;Seek knowledge from the cradle to the grave.&rdquo;
        </p>
      </footer>
    </main>
  );
}
