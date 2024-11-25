"use client";

import { useSearchParams } from 'next/navigation';
import { UpdateOpponentTeamClient } from './client';

export default function UpdateOpponentTeamPage() {
  const searchParams = useSearchParams();
  const teamId = searchParams.get('id');

  return <UpdateOpponentTeamClient teamId={teamId} />;
} 
