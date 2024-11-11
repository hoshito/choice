"use client";

import { useRouter, usePathname } from 'next/navigation';
import styles from './FooterMenu.module.css';

export function FooterMenu() {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname.startsWith(path);
  };

  return (
    <div className={styles.footerMenu}>
      <button
        className={`${styles.menuButton} ${isActive('/team') ? styles.active : ''}`}
        onClick={() => router.push('/team')}
      >
        <span></span>
        <span>チーム</span>
      </button>
      <button
        className={`${styles.menuButton} ${isActive('/opponent') ? styles.active : ''}`}
        onClick={() => router.push('/opponent')}
      >
        <span></span>
        <span>仮想敵</span>
      </button>
      <button
        className={`${styles.menuButton} ${isActive('/select') ? styles.active : ''}`}
        onClick={() => router.push('/select')}
      >
        <span></span>
        <span>選出</span>
      </button>
    </div>
  );
} 
