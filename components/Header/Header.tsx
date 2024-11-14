import { useState, useEffect } from 'react';
import styles from './Header.module.css';
import { useRouter, usePathname } from 'next/navigation';

export default function Header() {
    const router = useRouter();
    const pathname = usePathname(); // Get the current route
    const [activePage, setActivePage] = useState(pathname); // Initialize with the current path

    useEffect(() => {
        // Sync activePage with the current path whenever it changes
        setActivePage(pathname);
    }, [pathname]);

    const handleNavigation = (url: string) => () => {
        router.push(url);
    };

    return (
        <div className={styles.header}>
            <a className={styles.logoLink} data-testid="together-logo-link" data-cy="together-logo-link" href="/">
                <strong>Learning Engine</strong>
            </a>

            <div className={styles.navigationContainer}>
                <div className={styles.navGroup}>
                    <button
                        className={`${styles.navigationButton} ${activePage === '/dashboard' ? styles.activeNavigationButton : ''}`}
                        onClick={handleNavigation('/dashboard')}
                    >
                        Dashboard
                    </button>
                    <button
                        className={`${styles.navigationButton} ${activePage === '/workspace' ? styles.activeNavigationButton : ''}`}
                        onClick={handleNavigation('/workspace')}
                    >
                        Workspace
                    </button>
                    <button
                        className={`${styles.navigationButton} ${activePage === '/notes' ? styles.activeNavigationButton : ''}`}
                        onClick={handleNavigation('/notes')}
                    >
                        Notes
                    </button>
                </div>
                <div className={styles.profileCircle}></div>
            </div>
        </div>
    );
}
