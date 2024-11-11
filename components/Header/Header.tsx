import styles from './Header.module.css';
import { useRouter } from 'next/navigation'

export default function Header() {
    const router = useRouter();

    const handleDashboardClick = () => {
        router.push('/dashboard');
    };

    return (
        <div className={styles.header}>
            <a className={styles.logoLink} data-testid="together-logo-link" data-cy="together-logo-link" href="/">
                <strong>Learning Engine</strong>
            </a>

            <div className={styles.navigationContainer}>
                <div className={styles.navGroup}>
                    <button className={styles.navigationButton} onClick={handleDashboardClick}>Dashboard</button>
                    <button className={styles.activeNavigationButton}>Workspace</button>
                    <button className={styles.navigationButton}>Notes</button>
                </div>
                <div className={styles.profileCircle}></div>
            </div>
        </div>
    );
}