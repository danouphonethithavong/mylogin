// 📁 src/app/page.tsx
'use client';

import { Container, Typography, Button, Box } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        textAlign="center"
      >
        <Typography variant="h3" gutterBottom>WELCOME</Typography>
        <Typography variant="body1">THIS FIRST PAGE</Typography>
        <Box mt={4}>
          <Button variant="contained" onClick={() => router.push('/login')}>
            NEXT TO LOGIN
          </Button>
        </Box>
      </Box>
    </Container>
  );
}