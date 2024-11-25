"use client";

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { UpdateTeamClient } from './client';

function UpdateForm() {
  const searchParams = useSearchParams();
  const teamId = searchParams.get('id');
  return <UpdateTeamClient teamId={teamId} />;
}

export default function UpdateTeamPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UpdateForm />
    </Suspense>
  );
}
