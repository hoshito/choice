"use client";

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { UpdateOpponentTeamClient } from './client';

function UpdateForm() {
  const searchParams = useSearchParams();
  const teamId = searchParams.get('id');
  return <UpdateOpponentTeamClient teamId={teamId} />;
}

export default function UpdateOpponentTeamPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UpdateForm />
    </Suspense>
  );
} 
