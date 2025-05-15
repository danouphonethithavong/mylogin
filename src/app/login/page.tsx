// 📁 src/app/login/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  TextField,
  Button,
  Container,
  Typography,
  Paper,
  Box,
  Alert,
  Link,
  IconButton,
  InputAdornment
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { login, isAuthenticated } from '@/lib/auth';

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [touchedPassword, setTouchedPassword] = useState(false);

  useEffect(() => {
    if (isAuthenticated()) {
      router.replace('/dashboard');
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (e.target.name === 'password') setTouchedPassword(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(form.email, form.password);
    if (success) {
      router.push('/dashboard');
    } else {
      setError('email or password is wrong');
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const isFormValid = form.email.trim() !== '' && form.password.trim() !== '';
  const passwordError = touchedPassword && form.password.trim() === '';

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ mt: 8, p: 4 }}>
        <Typography variant="h5" align="center">LOGIN</Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            fullWidth
            name="email"
            label="Email"
            margin="normal"
            value={form.email}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            margin="normal"
            value={form.password}
            onChange={handleChange}
            error={passwordError}
            helperText={passwordError ? 'error: please text' : ''}
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
            disabled={!isFormValid}
          >
            Login
          </Button>
          <Box mt={2} display="flex" justifyContent="space-between">
            <Link href="/forgot-password">forgot-password ?</Link>
            <Link href="/register">register</Link>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}
