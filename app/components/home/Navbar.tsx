'use client';

import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
} from '@mui/material';
import { Bolt } from '@mui/icons-material';

const Navbar = () => {
  return (
    <AppBar position="fixed" sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
      <Container maxWidth="xl">
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            py: 2,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Bolt sx={{ color: '#00ffff', fontSize: { xs: 24, md: 28 } }} />
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontWeight: 600,
                color: '#ffffff',
                fontSize: { xs: '1rem', md: '1.25rem' },
              }}
            >
              Accelerated Nexus of Talent
            </Typography>
          </Box>
          <Box 
            sx={{ 
              display: { xs: 'none', lg: 'flex' },
              alignItems: 'center', 
              gap: { md: 2, lg: 3 },
              flexWrap: 'wrap',
            }}
          >
            <Button
              color="inherit"
              sx={{
                color: 'text.primary',
                textTransform: 'none',
                fontSize: { md: '0.85rem', lg: '0.95rem' },
                fontWeight: 400,
                minWidth: 'auto',
                px: { md: 1, lg: 1.5 },
                '&:hover': {
                  color: 'primary.main',
                  backgroundColor: 'transparent',
                },
              }}
            >
              How It Works
            </Button>
            <Button
              color="inherit"
              sx={{
                color: 'text.primary',
                textTransform: 'none',
                fontSize: { md: '0.85rem', lg: '0.95rem' },
                fontWeight: 400,
                minWidth: 'auto',
                px: { md: 1, lg: 1.5 },
                '&:hover': {
                  color: 'primary.main',
                  backgroundColor: 'transparent',
                },
              }}
            >
              For Candidates
            </Button>
            <Button
              color="inherit"
              sx={{
                color: 'text.primary',
                textTransform: 'none',
                fontSize: { md: '0.85rem', lg: '0.95rem' },
                fontWeight: 400,
                minWidth: 'auto',
                px: { md: 1, lg: 1.5 },
                '&:hover': {
                  color: 'primary.main',
                  backgroundColor: 'transparent',
                },
              }}
            >
              For Recruiters
            </Button>
            <Button
              color="inherit"
              sx={{
                color: 'text.primary',
                textTransform: 'none',
                fontSize: { md: '0.85rem', lg: '0.95rem' },
                fontWeight: 400,
                minWidth: 'auto',
                px: { md: 1, lg: 1.5 },
                '&:hover': {
                  color: 'primary.main',
                  backgroundColor: 'transparent',
                },
              }}
            >
              Titles
            </Button>
            <Button
              color="inherit"
              sx={{
                color: 'text.primary',
                textTransform: 'none',
                fontSize: { md: '0.85rem', lg: '0.95rem' },
                fontWeight: 500,
                minWidth: 'auto',
                px: { md: 1, lg: 1.5 },
                '&:hover': {
                  color: 'primary.main',
                  backgroundColor: 'transparent',
                },
              }}
            >
              SIGN IN
            </Button>
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#00ffff',
                color: '#000000',
                textTransform: 'none',
                fontSize: { md: '0.85rem', lg: '0.95rem' },
                fontWeight: 600,
                borderRadius: '6px',
                px: { md: 2, lg: 2.5 },
                py: { md: 0.75, lg: 1 },
                '&:hover': {
                  backgroundColor: '#33ffff',
                },
              }}
            >
              GET STARTED
            </Button>
          </Box>
          <Box sx={{ display: { xs: 'flex', lg: 'none' }, gap: 1 }}>
            <Button
              color="inherit"
              sx={{
                color: 'text.primary',
                textTransform: 'none',
                fontSize: '0.8rem',
                fontWeight: 500,
                minWidth: 'auto',
                px: 1,
              }}
            >
              SIGN IN
            </Button>
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#00ffff',
                color: '#000000',
                textTransform: 'none',
                fontSize: '0.8rem',
                fontWeight: 600,
                borderRadius: '6px',
                px: 1.5,
                py: 0.5,
                '&:hover': {
                  backgroundColor: '#33ffff',
                },
              }}
            >
              GET STARTED
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;

