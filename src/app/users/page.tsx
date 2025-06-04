'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';

type User = {
  id: number;
  name: string;
};

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [userName, setUserName] = useState('');
  const [editId, setEditId] = useState<number | null>(null);
  const router = useRouter();

  // เพิ่มผู้ใช้ใหม่
  const handleAddUser = () => {
    if (!userName.trim()) return;
    setUsers([...users, { id: Date.now(), name: userName }]);
    setUserName('');
  };

  // ลบผู้ใช้
  const handleDelete = (id: number) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  // แก้ไขผู้ใช้
  const handleEdit = (id: number) => {
    const user = users.find((u) => u.id === id);
    if (user) {
      setUserName(user.name);
      setEditId(id);
    }
  };

  // บันทึกการแก้ไข
  const handleSaveEdit = () => {
    setUsers(
      users.map((u) =>
        u.id === editId ? { ...u, name: userName } : u
      )
    );
    setUserName('');
    setEditId(null);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
          MANAGE
      </Typography>

      <Box display="flex" gap={2} mb={3}>
        <TextField
          fullWidth
          label="username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={editId ? handleSaveEdit : handleAddUser}
        >
          {editId ? <SaveIcon /> : 'add'}
        </Button>
<Button
  variant="outlined"
  color="secondary"
  onClick={() => router.push('/dashboard')}
>
  Back to dashboard
</Button>
      </Box>

      <Paper variant="outlined">
        <List>
          {users.map((user) => (
            <ListItem
              key={user.id}
              secondaryAction={
                <>
                  <IconButton
                    edge="end"
                    aria-label="edit"
                    onClick={() => handleEdit(user.id)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleDelete(user.id)}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </>
              }
            >
              <ListItemText primary={user.name} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
}
