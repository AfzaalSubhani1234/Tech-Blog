
import styles from "./page.module.css";

export default function RegisterPage() {
    return (
        <main className={styles.container}>
            <form className={styles.form}>
                <h1 className={styles.heading}>
                    Create Account
                </h1>

                <p className={styles.subtitle}>
                    Register for your account
                </p>

                <label htmlFor="username">Username</label>
                <input
                    id="username"
                    type="text"
                    placeholder="Enter username"
                    className={styles.input}
                />

                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    type="email"
                    placeholder="Enter email"
                    className={styles.input}
                />

                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    type="password"
                    placeholder="Enter password"
                    className={styles.input}
                />

                <label htmlFor="password2">
                    Confirm Password
                </label>
                <input
                    id="password2"
                    type="password"
                    placeholder="Confirm password"
                    className={styles.input}
                />

                <button type="button" className={styles.button}>
                    Register
                </button>
            </form>
        </main>
    );
}
