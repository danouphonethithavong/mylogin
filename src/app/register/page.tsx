'use client';

import { Container, TextField, Button, Typography, Box, Paper } from '@mui/material';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [form, setForm] = useState({ email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setError('รหัสผ่านไม่ตรงกัน');
      return;
    }
    // NOTE: ในโปรเจกต์จริงควรเชื่อมกับฐานข้อมูล
    setSuccess(true);
    setTimeout(() => router.push('/login'), 1500);
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ mt: 8, p: 4 }}>
        <Typography variant="h5" gutterBottom>register</Typography>
        {success ? (
          <Typography color="success.main">สมัครสมาชิกสำเร็จ! กำลังเปลี่ยนไปหน้าเข้าสู่ระบบ...</Typography>
        ) : (
          <Box component="form" onSubmit={handleSubmit}>
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
              type="password"
              margin="normal"
              value={form.password}
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              name="confirmPassword"
              label="ยืนยันรหัสผ่าน"
              type="password"
              margin="normal"
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />
            {error && <Typography color="error" sx={{ mt: 1 }}>{error}</Typography>}
            <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
              สมัครสมาชิก
            </Button>
          </Box>
        )}
      </Paper>
    </Container>
  );
}
