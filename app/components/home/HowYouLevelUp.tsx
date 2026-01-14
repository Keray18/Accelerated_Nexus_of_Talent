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
  Code,
  Psychology,
  Work,
  School,
  EmojiEvents,
  Search,
} from '@mui/icons-material';

const HowYouLevelUp = () => {
  const cards = [
    {
      icon: <Code sx={{ fontSize: { xs: 32, md: 40 }, color: '#4caf50' }} />,
      title: 'Build Projects',
      color: '#4caf50',
      description: 'Ship real projects. Connect GitHub. Earn XP based on complexity and impact.',
    },
    {
      icon: <Psychology sx={{ fontSize: { xs: 32, md: 40 }, color: '#9c27b0' }} />,
      title: 'Solve Problems',
      color: '#9c27b0',
      description: 'Complete challenges. Difficulty-weighted XP. Accuracy beats volume.',
    },
    {
      icon: <Work sx={{ fontSize: { xs: 32, md: 40 }, color: '#ffc107' }} />,
      title: 'Freelance',
      color: '#ffc107',
      description: 'Take real gigs. Client ratings build your reputation. Milestones verified.',
    },
    {
      icon: <School sx={{ fontSize: { xs: 32, md: 40 }, color: '#03a9f4' }} />,
      title: 'Keep Learning',
      color: '#03a9f4',
      description: 'Certificates count. But learning must link to applied output.',
    },
    {
      icon: <EmojiEvents sx={{ fontSize: { xs: 32, md: 40 }, color: '#e91e63' }} />,
      title: 'Earn Titles',
      color: '#e91e63',
      description: 'Creator. Breaker. Architect. Titles describe how you grow.',
    },
    {
      icon: <Search sx={{ fontSize: { xs: 32, md: 40 }, color: '#03a9f4' }} />,
      title: 'Get Discovered',
      color: '#03a9f4',
      description: 'Recruiters query by skills, levels, and titles. No resume screening.',
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
            radial-gradient(circle at 20% 30%, rgba(0, 255, 255, 0.05) 1px, transparent 1px),
            radial-gradient(circle at 80% 70%, rgba(0, 255, 255, 0.05) 1px, transparent 1px),
            radial-gradient(circle at 40% 80%, rgba(156, 39, 176, 0.05) 1px, transparent 1px)
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
            How You{' '}
            <Box
              component="span"
              sx={{
                background: 'linear-gradient(90deg, #00ffff 0%, #33ffff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Level Up
            </Box>
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
              fontSize: { xs: '1rem', md: '1.125rem' },
              maxWidth: '700px',
              mx: 'auto',
            }}
          >
            Multiple paths to growth. Every action earns XP. Your profile tells your story.
          </Typography>
        </Box>

        <Grid container spacing={{ xs: 2, sm: 3 }}>
          {cards.map((card, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  height: '100%',
                  backgroundColor: 'rgba(15, 15, 26, 0.8)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    borderColor: card.color,
                    boxShadow: `0 8px 24px rgba(${card.color === '#4caf50' ? '76, 175, 80' : card.color === '#9c27b0' ? '156, 39, 176' : card.color === '#ffc107' ? '255, 193, 7' : card.color === '#03a9f4' ? '3, 169, 244' : '233, 30, 99'}, 0.3)`,
                  },
                }}
              >
                <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                  <Box sx={{ mb: 2 }}>{card.icon}</Box>
                  <Typography
                    variant="h6"
                    sx={{
                      color: card.color,
                      fontWeight: 700,
                      mb: 1.5,
                      fontSize: { xs: '1.1rem', md: '1.25rem' },
                    }}
                  >
                    {card.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'text.primary',
                      lineHeight: 1.6,
                      fontSize: { xs: '0.875rem', md: '0.9375rem' },
                    }}
                  >
                    {card.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default HowYouLevelUp;
