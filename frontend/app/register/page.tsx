
"use client";
import { useState } from "react";
import styles from "./page.module.css";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRegister(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();
    setMessage("");

    if (password !== password2) {
      setMessage("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/home/register/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            email,
            password,
            password2,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        const errors = Object.entries(data)
          .map(([field, value]) => {
            const detail = Array.isArray(value)
              ? value.join(", ")
              : typeof value === "string"
                ? value
                : JSON.stringify(value);

            return `${field}: ${detail}`;
          })
          .join(" | ");

        setMessage(errors || "Registration failed.");
        return;
      }

      setMessage("Registration successful! You can now log in.");

      setUsername("");
      setEmail("");
      setPassword("");
      setPassword2("");
    } catch {
      setMessage(
        "Cannot connect to Django. Make sure the backend is running."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className={styles.container}>
      <form className={styles.form} onSubmit={handleRegister}>
        <h1 className={styles.heading}>Create Account</h1>

        <p className={styles.subtitle}>
          Register for your account
        </p>

        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          placeholder="Enter username"
          className={styles.input}
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          required
        />

        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          placeholder="Enter email"
          className={styles.input}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          placeholder="Enter password"
          className={styles.input}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />

        <label htmlFor="password2">Confirm Password</label>
        <input
          id="password2"
          type="password"
          placeholder="Confirm password"
          className={styles.input}
          value={password2}
          onChange={(event) => setPassword2(event.target.value)}
          required
        />

        <button
          type="submit"
          className={styles.button}
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>

        {message && <p role="status">{message}</p>}
      </form>
    </main>
  );
}
