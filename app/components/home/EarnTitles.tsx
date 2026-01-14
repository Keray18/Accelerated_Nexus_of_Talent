'use client';

import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
} from '@mui/material';
import {
  Build,
  FlashOn,
  Work,
  Explore,
  Architecture,
} from '@mui/icons-material';

const EarnTitles = () => {
  const titles = [
    {
      icon: <Build sx={{ fontSize: { xs: 28, md: 32 }, color: '#9c27b0' }} />,
      title: 'Creator II',
      color: '#4caf50',
      description: 'Project-focused builder',
    },
    {
      icon: <FlashOn sx={{ fontSize: { xs: 28, md: 32 }, color: '#ff9800' }} />,
      title: 'Breaker III',
      color: '#9c27b0',
      description: 'Problem solver',
    },
    {
      icon: <Work sx={{ fontSize: { xs: 28, md: 32 }, color: '#795548' }} />,
      title: 'Prolancer I',
      color: '#ffc107',
      description: 'Freelance specialist',
    },
    {
      icon: <Explore sx={{ fontSize: { xs: 28, md: 32 }, color: '#9c27b0' }} />,
      title: 'Explorer II',
      color: '#03a9f4',
      description: 'Stack learner',
    },
    {
      icon: <Architecture sx={{ fontSize: { xs: 28, md: 32 }, color: '#f44336' }} />,
      title: 'Architect I',
      color: '#f44336',
      description: 'System designer',
    },
  ];

  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        background: 'linear-gradient(180deg, #0a0a0f 0%, #0f0f1a 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background dots effect */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            radial-gradient(circle at 30% 40%, rgba(0, 255, 255, 0.05) 1px, transparent 1px),
            radial-gradient(circle at 70% 60%, rgba(156, 39, 176, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          pointerEvents: 'none',
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h2"
            sx={{
              color: 'text.primary',
              fontWeight: 700,
              fontSize: { xs: '2rem', md: '3rem' },
              mb: 2,
            }}
          >
            Earn{' '}
            <Box
              component="span"
              sx={{
                color: '#ffc107',
              }}
            >
              Titles
            </Box>
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
              fontSize: { xs: '1rem', md: '1.125rem' },
              maxWidth: '700px',
              mx: 'auto',
              fontStyle: 'italic',
            }}
          >
            Behavior-driven titles that describe <em>how</em> you grow. Not ranks—identities.
          </Typography>
        </Box>

        <Grid container spacing={{ xs: 2, sm: 3 }} sx={{ mb: 4 }}>
          {titles.map((title, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  backgroundColor: 'rgba(15, 15, 26, 0.8)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    borderColor: title.color,
                    boxShadow: `0 8px 24px rgba(${title.color === '#4caf50' ? '76, 175, 80' : title.color === '#9c27b0' ? '156, 39, 176' : title.color === '#ffc107' ? '255, 193, 7' : title.color === '#03a9f4' ? '3, 169, 244' : '244, 67, 54'}, 0.3)`,
                  },
                }}
              >
                <CardContent
                  sx={{
                    p: { xs: 2, sm: 3 },
                    display: 'flex',
                    alignItems: 'center',
                    gap: { xs: 1.5, md: 2 },
                  }}
                >
                  <Box>{title.icon}</Box>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        color: title.color,
                        fontWeight: 700,
                        mb: 0.5,
                        fontSize: { xs: '1.1rem', md: '1.25rem' },
                      }}
                    >
                      {title.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: 'text.secondary',
                        fontSize: { xs: '0.85rem', md: '0.9rem' },
                      }}
                    >
                      {title.description}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Info bar */}
        <Card
          sx={{
            backgroundColor: 'rgba(15, 15, 26, 0.8)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            maxWidth: '800px',
            mx: 'auto',
          }}
        >
          <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Typography
                variant="body2"
                sx={{
                  color: 'text.secondary',
                  fontSize: { xs: '0.875rem', md: '0.95rem' },
                }}
              >
                Users can hold <Box component="span" sx={{ color: '#ffc107', fontWeight: 700 }}>multiple titles</Box> simultaneously
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: 'text.secondary',
                  fontSize: { xs: '0.875rem', md: '0.95rem' },
                }}
              >
                Titles <Box component="span" sx={{ color: '#03a9f4', fontWeight: 700 }}>evolve</Box> as you grow
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default EarnTitles;
