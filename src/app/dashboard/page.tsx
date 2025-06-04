'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getUser, isAuthenticated } from '@/lib/auth';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
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
  ListItemText,
  IconButton
  
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<{ email: string } | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false); // state สำหรับควบคุม Drawer

  useEffect(() => {
    if (!isAuthenticated()) {
      router.replace('/login');
    } else {
      setUser(getUser());
    }
  }, []);

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      {/* AppBar */}
      <AppBar
        position="fixed"
        sx={{
          height: '70px',
          justifyContent: 'center',
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar>
          {/* ปุ่มสามขีด */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={toggleDrawer(true)}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
            <HomeIcon style={{marginRight: '5px'}}>
            startIcon={<HomeIcon />}
          </HomeIcon>
          <Typography variant="h6" noWrap component="div">
            Dashboard
          </Typography>
          
          <Box sx={{ flexGrow: 1 }} />

          <Button
            href="/logout"
            variant="outlined"
            color="inherit"
            >      
            Logout:
            <LogoutIcon >
              startIcon={< LogoutIcon/>}
            </LogoutIcon>
          </Button>
        </Toolbar>
      </AppBar>

      {/* Drawer แบบ Slide จากซ้าย */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        sx={{
          [`& .MuiDrawer-paper`]: {
            backgroundColor: '#9c27b0',
            color: '#fff',
            width: 200,
          },
        }}
      >
        <List sx={{ mt: '70px' }}>
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
          <ListItemButton component="a" href="/products">
            <ListItemText primary="products" />
          </ListItemButton>
          <ListItemButton component="a" href="/users">
            <ListItemText primary="users" />
          </ListItemButton>
        </List>
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          mt: '70px',
          p: 2,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '50vh',
          
        }}
      >
        <Container maxWidth="sm"
        sx={{ textAlign: 'center'}}
        >
          {user && (
            <Typography variant="h4" gutterBottom>
              WELCOME : {user.email}
            </Typography>
          )}
        </Container>
      </Box>
    </Box>
  );
}
