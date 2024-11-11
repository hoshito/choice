"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './styles.module.css';
import { Team } from '@/types/team';
import { TeamStorage, SelectionStorage } from '@/services/storage';
import commonStyles from '@/styles/common.module.css';
import { FooterMenu } from '@/components/FooterMenu';

export default function SelectPage() {
  const router = useRouter();
  const [teams, setTeams] = useState<Team[]>([]);

  useEffect(() => {
    setTeams(TeamStorage.getTeams());
  }, []);

  const handleTeamSelect = (team: Team) => {
    SelectionStorage.saveSelectedTeam(team);
    router.push('/select/order');
  };

  return (
    <div className={commonStyles.pageContainer}>
      <div className={commonStyles.content}>
        <div className={commonStyles.header}>
          <h1>パーティ選択</h1>
        </div>
        {teams.length > 0 ? (
          teams.map((team) => (
            <div
              key={team.id}
              className={`${commonStyles.teamCard} ${commonStyles.clickable}`}
              onClick={() => handleTeamSelect(team)}
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
            </div>
          ))
        ) : (
          <p className={styles.emptyMessage}>チームが登録されていません</p>
        )}
      </div>
      <FooterMenu />
    </div>
  );
}
