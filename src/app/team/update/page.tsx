"use client";

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Team } from '@/types/team';
import { TeamStorage } from '@/services/storage';
import { FooterMenu } from '@/components/FooterMenu';
import commonStyles from '@/styles/common.module.css';

export default function CreateTeamPage() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const newTeam: Team = {
      id: Date.now().toString(),
      teamName: formData.get('teamName') as string,
      pokemon1: formData.get('pokemon1') as string,
      pokemon2: formData.get('pokemon2') as string,
      pokemon3: formData.get('pokemon3') as string,
      pokemon4: formData.get('pokemon4') as string,
      pokemon5: formData.get('pokemon5') as string,
      pokemon6: formData.get('pokemon6') as string,
    };

    TeamStorage.saveTeam(newTeam);
    alert('チームを保存しました！');
    router.push('/team');
  };

  return (
    <div className={commonStyles.pageContainer}>
      <div className={commonStyles.content}>
        <div className={commonStyles.header}>
          <Link href="/team">
            <span>🔙</span>
          </Link>
          <h1>チーム登録</h1>
        </div>
        <form className={commonStyles.textFields} onSubmit={handleSubmit}>
          <input type="text" name="teamName" placeholder="チーム名" required />
          <input type="text" name="pokemon1" placeholder="手持ち1" required />
          <input type="text" name="pokemon2" placeholder="手持ち2" required />
          <input type="text" name="pokemon3" placeholder="手持ち3" required />
          <input type="text" name="pokemon4" placeholder="手持ち4" required />
          <input type="text" name="pokemon5" placeholder="手持ち5" required />
          <input type="text" name="pokemon6" placeholder="手持ち6" required />
          <button type="submit">登録</button>
        </form>
      </div>
      <FooterMenu />
    </div>
  );
}
