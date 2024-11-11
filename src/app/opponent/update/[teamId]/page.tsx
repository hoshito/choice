"use client";

import { useEffect, useState } from "react";
import styles from "../../styles.module.css";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useParams } from "next/navigation";
import { OpponentTeam } from "@/types/team";
import { OpponentStorage } from "@/services/storage";
import { FooterMenu } from "@/components/FooterMenu";
import commonStyles from "@/styles/common.module.css";
export default function UpdateOpponentTeamPage() {
  const router = useRouter();
  const params = useParams();
  const [team, setTeam] = useState<OpponentTeam | null>(null);

  useEffect(() => {
    const teamId = params?.teamId as string;
    if (!teamId) return;

    const teams = OpponentStorage.getTeams();
    const foundTeam = teams.find((t) => t.id === teamId);
    if (foundTeam) {
      setTeam(foundTeam);
    }
  }, [params]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const teamId = params?.teamId as string;

    const formData = new FormData(e.currentTarget);
    const updatedTeam: OpponentTeam = {
      id: teamId,
      teamName: formData.get('teamName') as string,
      memo: formData.get('memo') as string,
    };

    OpponentStorage.updateTeam(updatedTeam);
    alert('チームを更新しました！');
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
