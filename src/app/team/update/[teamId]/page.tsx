import { UpdateTeamClient } from './client';

export function generateStaticParams() {
  return [{ teamId: '1' }];
}

export default function UpdateTeamPage() {
  return <UpdateTeamClient />;
}
