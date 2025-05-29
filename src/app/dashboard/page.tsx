// 📁 src/app/dashboard/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getUser, isAuthenticated } from '@/lib/auth';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Container,
  Button,
  Drawer,
  List,
  ListItemButton,
  ListItemText
} from '@mui/material';

export default function DashboardPage() {
  const router = useRouter(); // ใช้สำหรับเปลี่ยนหน้า
  const [user, setUser] = useState<{ email: string } | null>(null); // สร้าง state สำหรับเก็บข้อมูลผู้ใช้

  useEffect(() => {
    // เมื่อโหลด component ให้ตรวจสอบว่า login แล้วหรือยัง
    if (!isAuthenticated()) {
      router.replace('/login'); // ถ้ายังไม่ login ให้ไปหน้า login
    } else {
      setUser(getUser()); // ถ้า login แล้ว ให้ดึงข้อมูลผู้ใช้มาเก็บใน state
    }
  }, []);

  const drawerWidth = 200; // ความกว้างของ Sidebar

  return (
    <Box sx={{ display: 'flex' }}> {/* ใช้ Flex layout สำหรับจัดหน้าแบ่งซ้าย-ขวา */}
      
      {/* Header ด้านบน */}
      <AppBar
        position="fixed"
        sx={{
          height: '70px', // ความสูงไม่เกิน 70px
          justifyContent: 'center',
          zIndex: (theme) => theme.zIndex.drawer + 1, // ให้อยู่ด้านบนของ Drawer
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Sidebar เมนูด้านซ้าย */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            backgroundColor: '#9c27b0', // สีม่วง
            color: '#fff', // ตัวอักษรสีขาว
            width: drawerWidth,
            marginTop: '70px', // ขยับลงจาก Header
            height: 'calc(100% - 70px)', // เต็มหน้าจอ ลบส่วนของ Header
            boxSizing: 'border-box',
          },
        }}
      >
        <List>
          {/* เมนู Sidebar แต่ละรายการ */}
          <ListItemButton component="a" href="/dashboard">
            <ListItemText primary="HI" />
          </ListItemButton>
          <ListItemButton component="a" href="/dashboard">
            <ListItemText primary="HELLO" />
          </ListItemButton>
          <ListItemButton component="a" href="/dashboard">
            <ListItemText primary="HEY" />
          </ListItemButton>
          <ListItemButton component="a" href="/dashboard">
            <ListItemText primary="WHAT UP" />
          </ListItemButton>
          <ListItemButton component="a" href="/dashboard">
            <ListItemText primary="HEY BRO" />
          </ListItemButton>
        </List>
      </Drawer>

      {/* ส่วนเนื้อหาหลักด้านขวา */}
      <Box
        component="main"
        sx={{
          flexGrow: 1, // ขยายให้เต็มที่
          mt: '70px', // ขยับลงจาก Header
          ml: `${drawerWidth}px`, // ขยับจาก Sidebar
          p: 2, // padding ภายในกล่อง
        }}
      >
        <Container maxWidth="lg" sx={{ ml: '10px', mr: '20px' }}>
          {/* ถ้ามีข้อมูลผู้ใช้ ให้แสดงข้อความต้อนรับ */}
          {user && (
            <Typography variant="h4" gutterBottom>
              WELCOME : {user.email}
            </Typography>
          )}

          {/* ปุ่ม Logout */}
          <Button
            href="/logout"
            variant="outlined"
            color="error"
            sx={{ mt: 3 }}
          >
            Logout
          </Button>
        </Container>
      </Box>
    </Box>
  );
}
