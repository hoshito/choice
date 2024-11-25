"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { OpponentTeam } from "@/types/team";
import { OpponentStorage } from "@/services/storage";
import { FooterMenu } from "@/components/FooterMenu";
import commonStyles from "@/styles/common.module.css";
import styles from "./styles.module.css";

type UpdateOpponentTeamClientProps = {
  teamId?: string | null;
};

export function UpdateOpponentTeamClient({ teamId }: UpdateOpponentTeamClientProps) {
  const router = useRouter();
  const [team, setTeam] = useState<OpponentTeam | null>(null);

  useEffect(() => {
    if (!teamId) {
      // 新規作成の場合は空のチームを設定
      setTeam({
        id: crypto.randomUUID(),
        teamName: '',
        memo: '',
      });
      return;
    }

    const teams = OpponentStorage.getTeams();
    const foundTeam = teams.find((t) => t.id === teamId);
    if (foundTeam) {
      setTeam(foundTeam);
    }
  }, [teamId]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const updatedTeam: OpponentTeam = {
      id: team?.id || crypto.randomUUID(),
      teamName: formData.get('teamName') as string,
      memo: formData.get('memo') as string,
    };

    if (teamId) {
      OpponentStorage.updateTeam(updatedTeam);
      alert('チームを更新しました！');
    } else {
      OpponentStorage.saveTeam(updatedTeam);
      alert('チームを作成しました！');
    }
    router.push('/opponent');
  };

  if (!team) {
    return <div>Loading...</div>;
  }

  return (
    <div className={commonStyles.pageContainer}>
      <div className={commonStyles.content}>
        <div className={commonStyles.header}>
          <Link href="/opponent">
            <span>🔙</span>
          </Link>
          <h1>仮想敵チーム編集</h1>
        </div>
        <form className={commonStyles.textFields} onSubmit={handleSubmit}>
          <input
            type="text"
            name="teamName"
            placeholder="チーム名"
            defaultValue={team.teamName}
            required
            className={styles.input}
          />
          <textarea
            name="memo"
            placeholder="メモ"
            rows={5}
            defaultValue={team.memo}
            required
            className={styles.textarea}
          />
          <button type="submit" className={styles.submitButton}>更新</button>
        </form>
      </div>
      <FooterMenu />
    </div>
  );
}
