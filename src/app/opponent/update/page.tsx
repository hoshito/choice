"use client";

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { OpponentTeam } from '@/types/team';
import { OpponentStorage } from '@/services/storage';
import { FooterMenu } from '@/components/FooterMenu';
import commonStyles from '@/styles/common.module.css';
import styles from './styles.module.css';

export default function CreateOpponentTeamPage() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const newTeam: OpponentTeam = {
      id: Date.now().toString(),
      teamName: formData.get('teamName') as string,
      memo: formData.get('memo') as string,
    };

    OpponentStorage.saveTeam(newTeam);
    alert('チームを保存しました！');
    router.push('/opponent');
  };

  return (
    <div className={commonStyles.pageContainer}>
      <div className={commonStyles.content}>
        <div className={commonStyles.header}>
          <Link href="/opponent">
            <span>🔙</span>
          </Link>
          <h1>仮想敵チーム登録</h1>
        </div>
        <form className={commonStyles.textFields} onSubmit={handleSubmit}>
          <input
            type="text"
            name="teamName"
            placeholder="チーム名"
            required
            className={styles.input}
          />
          <textarea
            name="memo"
            placeholder="メモ"
            rows={5}
            required
            className={styles.textarea}
          />
          <button type="submit" className={styles.submitButton}>登録</button>
        </form>
      </div>
      <FooterMenu />
    </div>
  );
} 
