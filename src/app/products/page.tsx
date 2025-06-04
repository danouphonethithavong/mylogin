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

type Product = {
  id: number;
  name: string;
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [productName, setProductName] = useState('');
  const [editId, setEditId] = useState<number | null>(null);
  const router = useRouter();

  // เพิ่มสินค้าใหม่
  const handleAddProduct = () => {
    if (!productName.trim()) return;
    setProducts([...products, { id: Date.now(), name: productName }]);
    setProductName('');
  };

  // ลบสินค้า
  const handleDelete = (id: number) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  // แก้ไขสินค้า
  const handleEdit = (id: number) => {
    const product = products.find((p) => p.id === id);
    if (product) {
      setProductName(product.name);
      setEditId(id);
    }
  };

  // บันทึกการแก้ไข
  const handleSaveEdit = () => {
    setProducts(
      products.map((p) =>
        p.id === editId ? { ...p, name: productName } : p
      )
    );
    setProductName('');
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
          label="productname"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={editId ? handleSaveEdit : handleAddProduct}
        >
          {editId ? <SaveIcon /> : 'add'}
        </Button>
        <Button
        variant="outlined"
        color='secondary'
        onClick={() => router.push('/dashboard')}
        >
          Back to dashboard
        </Button>
      </Box>

      <Paper variant="outlined">
        <List>
          {products.map((product) => (
            <ListItem
              key={product.id}
              secondaryAction={
                <>
                  <IconButton
                    edge="end"
                    aria-label="edit"
                    onClick={() => handleEdit(product.id)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleDelete(product.id)}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </>
              }
            >
              <ListItemText primary={product.name} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
}
