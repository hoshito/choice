import { UpdateOpponentTeamClient } from './client';

export function generateStaticParams() {
  return [{ teamId: '1' }];
}

export default function UpdateOpponentTeamPage() {
  return <UpdateOpponentTeamClient />;
} 
