"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './styles.module.css';
import { Team } from '@/types/team';
import { TeamStorage } from '@/services/storage';
import { FooterMenu } from '@/components/FooterMenu';
import commonStyles from '@/styles/common.module.css';
import FloatingButton from '@/components/FloatingButton';

export default function TeamPage() {
  const router = useRouter();
  const [teams, setTeams] = useState<Team[]>([]);

  useEffect(() => {
    setTeams(TeamStorage.getTeams());
  }, []);

  const handleDelete = (teamId: string) => {
    TeamStorage.deleteTeam(teamId);
    setTeams(TeamStorage.getTeams());
  };

  const handleCardClick = (teamId: string) => {
    router.push(`/team/update?id=${teamId}`);
  };

  return (
    <div className={commonStyles.pageContainer}>
      <div className={commonStyles.content}>
        <h1>マイチーム</h1>
        {teams.length > 0 ? (
          teams.map(team => (
            <div
              key={team.id}
              className={`${commonStyles.teamCard} ${commonStyles.clickable}`}
              onClick={() => handleCardClick(team.id)}
            >
              <h2>{team.teamName}</h2>
              <ul className={styles.pokemonList}>
                <li>{team.pokemon1}</li>
                <li>{team.pokemon2}</li>
                <li>{team.pokemon3}</li>
                <li>{team.pokemon4}</li>
                <li>{team.pokemon5}</li>
                <li>{team.pokemon6}</li>
              </ul>
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
      <FloatingButton onClick={() => router.push('/team/update')} />
    </div>
  );
}
