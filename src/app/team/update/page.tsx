"use client";

import { useSearchParams } from 'next/navigation';
import { UpdateTeamClient } from './client';

export default function UpdateTeamPage() {
  const searchParams = useSearchParams();
  const teamId = searchParams.get('id');

  return <UpdateTeamClient teamId={teamId} />;
}
