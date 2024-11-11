// components/Header.js
import styles from './Header.module.css';

export default function Header() {
    return (
        <div className={styles.header}>
            <a className={styles.logoLink} data-testid="together-logo-link" data-cy="together-logo-link" href="/">
                <strong>Planoeducation</strong>
            </a>

            <div className={styles.navigationContainer}>
                <div className={styles.navGroup}>
                    <button className={styles.navigationButton}>Dashboard</button>
                    <button className={styles.activeNavigationButton}>Workspace</button>
                    <button className={styles.navigationButton}>Notes</button>
                </div>
                <div className={styles.profileCircle}></div>
            </div>
        </div>
    );
}
