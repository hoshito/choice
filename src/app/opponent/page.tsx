"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { OpponentTeam } from '@/types/team';
import { OpponentStorage } from '@/services/storage';
import FloatingButton from '@/components/FloatingButton';
import { FooterMenu } from '@/components/FooterMenu';
import commonStyles from '@/styles/common.module.css';
import styles from './styles.module.css';

export default function OpponentTeamPage() {
  const router = useRouter();
  const [teams, setTeams] = useState<OpponentTeam[]>([]);

  useEffect(() => {
    setTeams(OpponentStorage.getTeams());
  }, []);

  const handleDelete = (teamId: string) => {
    OpponentStorage.deleteTeam(teamId);
    setTeams(OpponentStorage.getTeams());
  };

  const handleCardClick = (teamId: string) => {
    router.push(`/opponent/update?id=${teamId}`);
  };

  return (
    <div className={commonStyles.pageContainer}>
      <div className={commonStyles.content}>
        <h1>仮想敵チーム</h1>
        {teams.length > 0 ? (
          teams.map(team => (
            <div
              key={team.id}
              className={`${commonStyles.teamCard} ${commonStyles.clickable}`}
              onClick={() => handleCardClick(team.id)}
            >
              <h2>{team.teamName}</h2>
              <p className={styles.memo}>{team.memo}</p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(team.id);
                }}
                className={styles.deleteButton}
              >
                削除
              </button>
            </div>
          ))
        ) : (
          <p>まだチームが登録されていません</p>
        )}
      </div>
      <FooterMenu />
      <FloatingButton onClick={() => router.push('/opponent/update')} />
    </div>
  );
}
