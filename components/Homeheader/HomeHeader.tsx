"use client"

import styles from './HomeHeader.module.css';
import { useRouter } from 'next/navigation'

export default function HomeHeader() {
    const router = useRouter();

    const handleDashboardClick = (url: string) => () => {
        router.push(url);
    };

    return (
        <div className={styles.header}>
            <a className={styles.logoLink} data-testid="together-logo-link" data-cy="together-logo-link" href="/">
                <strong>Planoeducation</strong>
            </a>

            <div className={styles.navigationContainer}>
                <div className={styles.navGroup}>
                    <button className={styles.navigationButton} onClick={handleDashboardClick('/dashboard')}>Dashboard</button>
                </div>
                
            </div>
        </div>
    );
}