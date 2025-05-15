// 📁 src/app/dashboard/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getUser, isAuthenticated } from '@/lib/auth';
import { Container, Typography, Button } from '@mui/material';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<{ email: string } | null>(null);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.replace('/login');
    } else {
      setUser(getUser());
    }
  }, []);

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      {user && <Typography variant="h4">WELCOME : {user.email}</Typography>}
      <Button href="/logout" variant="outlined" color="error" sx={{ mt: 3 }}>
        Logout
      </Button>
    </Container>
  );
}