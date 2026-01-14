'use client';

import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  Person,
  Group,
  Work,
  ArrowForward,
  FiberManualRecord,
} from '@mui/icons-material';

const ChooseYourPath = () => {
  const paths = [
    {
      icon: <Person sx={{ fontSize: { xs: 40, md: 48 }, color: '#03a9f4' }} />,
      title: 'Candidate',
      subtitle: 'The Player',
      color: '#03a9f4',
      description: 'Level up through projects, problem-solving, and real work. Get discovered by matching recruiters.',
      tags: ['Backend Dev', 'Frontend Dev', 'AI/ML', 'QA'],
      buttonText: 'START LEVELING →',
    },
    {
      icon: <Group sx={{ fontSize: { xs: 40, md: 48 }, color: '#9c27b0' }} />,
      title: 'Recruiter',
      subtitle: 'The Scout',
      color: '#9c27b0',
      description: 'Query candidates by skills, levels, and behavioral titles. Skip resume screening entirely.',
      features: [
        'Skill-based search',
        'Instant shortlisting',
        'Activity insights',
      ],
      buttonText: 'FIND TALENT →',
    },
    {
      icon: <Work sx={{ fontSize: { xs: 40, md: 48 }, color: '#ffc107' }} />,
      title: 'Freelance Client',
      subtitle: 'The Patron',
      color: '#ffc107',
      description: 'Post gigs, hire verified talent, and trust milestone-based delivery with built-in accountability.',
      features: [
        'Verified freelancers',
        'Milestone tracking',
        'Dispute protection',
      ],
      buttonText: 'POST A GIG →',
    },
  ];

  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        background: 'linear-gradient(180deg, #0f0f1a 0%, #0a0a0f 100%)',
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
            radial-gradient(circle at 50% 50%, rgba(0, 255, 255, 0.05) 1px, transparent 1px)
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
            Choose Your{' '}
            <Box
              component="span"
              sx={{
                color: '#9c27b0',
              }}
            >
              Path
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
            Whether you're building your career or building your team, there's a place for you.
          </Typography>
        </Box>

        <Grid container spacing={{ xs: 3, md: 4 }}>
          {paths.map((path, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: 'rgba(15, 15, 26, 0.8)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    borderColor: path.color,
                    boxShadow: `0 8px 24px rgba(${path.color === '#03a9f4' ? '3, 169, 244' : path.color === '#9c27b0' ? '156, 39, 176' : '255, 193, 7'}, 0.3)`,
                  },
                }}
              >
                <CardContent sx={{ p: { xs: 3, md: 4 }, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <Box sx={{ mb: 2 }}>{path.icon}</Box>
                  <Typography
                    variant="h4"
                    sx={{
                      color: path.color,
                      fontWeight: 700,
                      mb: 0.5,
                      fontSize: { xs: '1.5rem', md: '1.75rem' },
                    }}
                  >
                    {path.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'text.secondary',
                      mb: 2,
                      fontSize: { xs: '0.875rem', md: '0.95rem' },
                    }}
                  >
                    {path.subtitle}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'text.secondary',
                      mb: 3,
                      lineHeight: 1.6,
                      flexGrow: 1,
                      fontSize: { xs: '0.875rem', md: '0.9375rem' },
                    }}
                  >
                    {path.description}
                  </Typography>

                  {path.tags && (
                    <Box sx={{ mb: 3, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {path.tags.map((tag, tagIndex) => (
                        <Chip
                          key={tagIndex}
                          label={tag}
                          size="small"
                          sx={{
                            backgroundColor: 'transparent',
                            border: `1px solid ${path.color}`,
                            color: path.color,
                            fontSize: '0.75rem',
                          }}
                        />
                      ))}
                      <Typography
                        variant="caption"
                        sx={{
                          color: 'text.secondary',
                          alignSelf: 'center',
                          ml: 1,
                        }}
                      >
                        +3 more
                      </Typography>
                    </Box>
                  )}

                  {path.features && (
                    <List sx={{ mb: 3, py: 0 }}>
                      {path.features.map((feature, featureIndex) => (
                        <ListItem key={featureIndex} sx={{ px: 0, py: 0.5 }}>
                          <ListItemIcon sx={{ minWidth: 24 }}>
                            <FiberManualRecord sx={{ fontSize: 8, color: path.color }} />
                          </ListItemIcon>
                          <ListItemText
                            primary={feature}
                            primaryTypographyProps={{
                              sx: { color: 'text.secondary', fontSize: '0.9rem' },
                            }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  )}

                  <Button
                    variant="outlined"
                    endIcon={<ArrowForward />}
                    sx={{
                      borderColor: path.color,
                      color: path.color,
                      textTransform: 'none',
                      fontWeight: 600,
                      mt: 'auto',
                      fontSize: { xs: '0.875rem', md: '0.95rem' },
                      px: { xs: 2, md: 3 },
                      py: { xs: 1, md: 1.25 },
                      '&:hover': {
                        borderColor: path.color,
                        backgroundColor: `${path.color}15`,
                      },
                    }}
                  >
                    {path.buttonText}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default ChooseYourPath;
