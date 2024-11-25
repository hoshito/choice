"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Team } from "@/types/team";
import { TeamStorage } from "@/services/storage";
import { FooterMenu } from "@/components/FooterMenu";
import commonStyles from "@/styles/common.module.css";

type UpdateTeamClientProps = {
  teamId?: string | null;
};

export function UpdateTeamClient({ teamId }: UpdateTeamClientProps) {
  const router = useRouter();
  const [team, setTeam] = useState<Team | null>(null);

  useEffect(() => {
    if (!teamId) return;

    const teams = TeamStorage.getTeams();
    const foundTeam = teams.find((t) => t.id === teamId);
    if (foundTeam) {
      setTeam(foundTeam);
    }
  }, [teamId]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!teamId) return;

    const formData = new FormData(e.currentTarget);
    const updatedTeam: Team = {
      id: teamId,
      teamName: formData.get('teamName') as string,
      pokemon1: formData.get('pokemon1') as string,
      pokemon2: formData.get('pokemon2') as string,
      pokemon3: formData.get('pokemon3') as string,
      pokemon4: formData.get('pokemon4') as string,
      pokemon5: formData.get('pokemon5') as string,
      pokemon6: formData.get('pokemon6') as string,
    };

    TeamStorage.updateTeam(updatedTeam);
    alert('チームを更新しました！');
    router.push('/team');
  };

  if (!team) {
    return <div>Loading...</div>;
  }

  return (
    <div className={commonStyles.pageContainer}>
      <div className={commonStyles.content}>
        <div className={commonStyles.header}>
          <Link href="/team">
            <span>🔙</span>
          </Link>
          <h1>チーム編集</h1>
        </div>
        <form className={commonStyles.textFields} onSubmit={handleSubmit}>
          <input
            type="text"
            name="teamName"
            placeholder="チーム名"
            defaultValue={team.teamName}
            required
          />
          <input
            type="text"
            name="pokemon1"
            placeholder="手持ち1"
            defaultValue={team.pokemon1}
            required
          />
          <input
            type="text"
            name="pokemon2"
            placeholder="手持ち2"
            defaultValue={team.pokemon2}
            required
          />
          <input
            type="text"
            name="pokemon3"
            placeholder="手持ち3"
            defaultValue={team.pokemon3}
            required
          />
          <input
            type="text"
            name="pokemon4"
            placeholder="手持ち4"
            defaultValue={team.pokemon4}
            required
          />
          <input
            type="text"
            name="pokemon5"
            placeholder="手持ち5"
            defaultValue={team.pokemon5}
            required
          />
          <input
            type="text"
            name="pokemon6"
            placeholder="手持ち6"
            defaultValue={team.pokemon6}
            required
          />
          <button type="submit">更新</button>
        </form>
      </div>
      <FooterMenu />
    </div>
  );
} 
