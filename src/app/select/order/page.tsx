"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Team, OpponentTeam, Selection, SelectionType } from '@/types/team';
import { OpponentStorage, SelectionStorage } from '@/services/storage';
import { FooterMenu } from '@/components/FooterMenu';
import commonStyles from '@/styles/common.module.css';
import styles from './styles.module.css';

export default function SelectOrderPage() {
  const router = useRouter();
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [opponents, setOpponents] = useState<OpponentTeam[]>([]);
  const [selections, setSelections] = useState<Selection>({});

  useEffect(() => {
    const team = SelectionStorage.getSelectedTeam();
    const savedSelections = SelectionStorage.getSelections();
    const opponentTeams = OpponentStorage.getTeams();

    if (!team) {
      router.push('/select');
      return;
    }

    setSelectedTeam(team);
    setOpponents(opponentTeams);
    setSelections(savedSelections);
  }, [router]);

  const handleSelectionChange = (
    opponentId: string,
    pokemonName: string,
    type: SelectionType
  ) => {
    const newSelections = {
      ...selections,
      [opponentId]: {
        ...selections[opponentId],
        [pokemonName]: type,
      },
    };
    setSelections(newSelections);
    SelectionStorage.saveSelection(newSelections);
  };

  const getPokemonList = (team: Team): string[] => {
    return [
      team.pokemon1,
      team.pokemon2,
      team.pokemon3,
      team.pokemon4,
      team.pokemon5,
      team.pokemon6,
    ];
  };

  if (!selectedTeam) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={commonStyles.pageContainer}>
      <div className={commonStyles.content}>
        <div className={commonStyles.header}>
          <Link href="/select">
            <span className={styles.backButton}>🔙</span>
          </Link>
          <h1>選出確認</h1>
        </div>

        {opponents.map((opponent) => (
          <div key={opponent.id} className={styles.opponentSection}>
            <div className={styles.opponentHeader}>
              <h2>vs {opponent.teamName}</h2>
              <p className={styles.memo}>{opponent.memo}</p>
            </div>
            <div className={styles.selectionGrid}>
              {getPokemonList(selectedTeam).map((pokemon) => (
                <div key={pokemon} className={styles.selectionRow}>
                  <span className={styles.pokemonName}>{pokemon}</span>
                  <div className={styles.radioGroup}>
                    {(['先発', '後発', '補欠'] as SelectionType[]).map((type) => (
                      <label key={type} className={styles.radioLabel}>
                        <input
                          type="radio"
                          name={`${opponent.id}-${pokemon}`}
                          checked={selections[opponent.id]?.[pokemon] === type}
                          onChange={() => handleSelectionChange(opponent.id, pokemon, type)}
                        />
                        <span>{type}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <FooterMenu />
    </div>
  );
}
