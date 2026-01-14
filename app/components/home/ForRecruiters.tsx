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
  TextField,
  InputAdornment,
  Chip,
  Avatar,
} from '@mui/material';
import {
  Search,
  FilterList,
  AccessTime,
  Star,
  Architecture,
  FlashOn,
  Explore,
  ArrowForward,
} from '@mui/icons-material';

const ForRecruiters = () => {
  const candidates = [
    {
      name: 'Alex Chen',
      level: 34,
      role: 'Backend Developer',
      match: 94,
      active: '2h ago',
      badges: [
        { icon: <Star sx={{ fontSize: 16 }} />, label: 'Creator I', color: '#4caf50' },
        { icon: <Architecture sx={{ fontSize: 16 }} />, label: 'Architect I', color: '#f44336' },
      ],
    },
    {
      name: 'Sarah Kim',
      level: 28,
      role: 'Full Stack Developer',
      match: 89,
      active: 'today',
      badges: [
        { icon: <FlashOn sx={{ fontSize: 16 }} />, label: 'Breaker I', color: '#ffc107' },
        { icon: <Explore sx={{ fontSize: 16 }} />, label: 'Explorer I', color: '#03a9f4' },
      ],
    },
    {
      name: 'Marcus Johnson',
      level: 41,
      role: 'DevOps Engineer',
      match: 86,
      active: '1d ago',
      badges: [
        { icon: <Architecture sx={{ fontSize: 16 }} />, label: 'Architect I', color: '#f44336' },
      ],
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
            radial-gradient(circle at 40% 50%, rgba(156, 39, 176, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          pointerEvents: 'none',
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container spacing={{ xs: 4, md: 6 }} alignItems="center">
          {/* Left Panel */}
          <Grid item xs={12} md={5}>
            <Typography
              variant="overline"
              sx={{
                color: '#ba68c8',
                fontSize: '0.875rem',
                fontWeight: 600,
                letterSpacing: 1,
                mb: 2,
                display: 'block',
              }}
            >
              FOR RECRUITERS
            </Typography>
            <Typography
              variant="h2"
              sx={{
                color: 'text.primary',
                fontWeight: 700,
                fontSize: { xs: '2rem', md: '3rem' },
                mb: 3,
              }}
            >
              Skip the{' '}
              <Box
                component="span"
                sx={{
                  color: '#9c27b0',
                }}
              >
                Resume Stack
              </Box>
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: 'text.secondary',
                mb: 4,
                lineHeight: 1.8,
                fontSize: '1.05rem',
              }}
            >
              Enter your requirements. Get ranked candidates with verified skills, recent activity, and behavioral profiles. Hire faster with confidence.
            </Typography>

            <Box sx={{ mb: 4 }}>
              {[
                'Query by skills, level range, and titles',
                'See why each candidate matched',
                'View recent activity and growth patterns',
                'Shortlist and schedule in one click',
              ].map((feature, index) => (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    mb: 2,
                  }}
                >
                  <Box
                    sx={{
                      color: '#9c27b0',
                      fontSize: '1.5rem',
                    }}
                  >
                    ✓
                  </Box>
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'text.secondary',
                      fontSize: '1rem',
                    }}
                  >
                    {feature}
                  </Typography>
                </Box>
              ))}
            </Box>

            <Button
              variant="contained"
              endIcon={<ArrowForward />}
              sx={{
                backgroundColor: '#9c27b0',
                color: 'white',
                textTransform: 'none',
                fontWeight: 600,
                px: { xs: 3, md: 4 },
                py: { xs: 1.25, md: 1.5 },
                fontSize: { xs: '0.9rem', md: '1rem' },
                width: { xs: '100%', sm: 'auto' },
                '&:hover': {
                  backgroundColor: '#ba68c8',
                },
              }}
            >
              EXPLORE RECRUITER TOOLS →
            </Button>
          </Grid>

          {/* Right Panel */}
          <Grid item xs={12} md={7}>
            <Card
              sx={{
                backgroundColor: 'rgba(15, 15, 26, 0.9)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                p: { xs: 2, sm: 3 },
              }}
            >
              {/* Search Bar */}
              <TextField
                fullWidth
                placeholder="Backend Developer, Node.js, Level 25+"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search sx={{ color: 'text.secondary' }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button
                        sx={{
                          minWidth: 'auto',
                          p: 1,
                          color: '#9c27b0',
                          backgroundColor: 'rgba(156, 39, 176, 0.1)',
                          '&:hover': {
                            backgroundColor: 'rgba(156, 39, 176, 0.2)',
                          },
                        }}
                      >
                        <FilterList />
                      </Button>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  mb: 3,
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    color: 'text.primary',
                    '& fieldset': {
                      borderColor: 'rgba(255, 255, 255, 0.1)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(255, 255, 255, 0.2)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#9c27b0',
                    },
                  },
                }}
              />

              <Typography
                variant="body2"
                sx={{
                  color: 'text.secondary',
                  mb: 3,
                  fontSize: '0.9rem',
                }}
              >
                <Box component="span" sx={{ color: '#9c27b0', fontWeight: 700 }}>
                  24
                </Box>{' '}
                candidates matched your criteria
              </Typography>

              {/* Candidate List */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {candidates.map((candidate, index) => (
                  <Card
                    key={index}
                    sx={{
                      backgroundColor: 'rgba(10, 10, 15, 0.8)',
                      border: '1px solid rgba(255, 255, 255, 0.05)',
                      borderRadius: '8px',
                      p: 2,
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: { xs: 'flex-start', sm: 'flex-start' },
                        mb: 1.5,
                        flexDirection: { xs: 'column', sm: 'row' },
                        gap: { xs: 1.5, sm: 0 },
                      }}
                    >
                      <Box sx={{ flex: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5, flexWrap: 'wrap' }}>
                          <Typography
                            variant="h6"
                            sx={{
                              color: 'text.primary',
                              fontWeight: 600,
                              fontSize: { xs: '1rem', sm: '1.1rem' },
                            }}
                          >
                            {candidate.name}
                          </Typography>
                          <Chip
                            label={`Lv.${candidate.level}`}
                            size="small"
                            sx={{
                              backgroundColor: 'rgba(156, 39, 176, 0.2)',
                              color: '#9c27b0',
                              fontWeight: 600,
                              height: '24px',
                              fontSize: { xs: '0.7rem', sm: '0.75rem' },
                            }}
                          />
                        </Box>
                        <Typography
                          variant="body2"
                          sx={{
                            color: 'text.secondary',
                            fontSize: { xs: '0.85rem', sm: '0.9rem' },
                            mb: 1,
                          }}
                        >
                          {candidate.role}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                          {candidate.badges.map((badge, badgeIndex) => (
                            <Chip
                              key={badgeIndex}
                              icon={badge.icon}
                              label={badge.label}
                              size="small"
                              sx={{
                                backgroundColor: `${badge.color}20`,
                                color: badge.color,
                                fontSize: { xs: '0.65rem', sm: '0.7rem' },
                                height: { xs: '18px', sm: '20px' },
                                '& .MuiChip-icon': {
                                  color: badge.color,
                                  fontSize: { xs: 14, sm: 16 },
                                },
                              }}
                            />
                          ))}
                        </Box>
                      </Box>
                      <Box sx={{ textAlign: { xs: 'left', sm: 'right' }, flexShrink: 0 }}>
                        <Typography
                          variant="h6"
                          sx={{
                            color: '#9c27b0',
                            fontWeight: 700,
                            fontSize: { xs: '1.25rem', sm: '1.5rem' },
                          }}
                        >
                          {candidate.match}%
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            color: 'text.secondary',
                            fontSize: { xs: '0.7rem', sm: '0.75rem' },
                          }}
                        >
                          match
                        </Typography>
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 0.5,
                            mt: 1,
                            justifyContent: { xs: 'flex-start', sm: 'flex-end' },
                          }}
                        >
                          <AccessTime sx={{ fontSize: { xs: 12, sm: 14 }, color: 'text.secondary' }} />
                          <Typography
                            variant="caption"
                            sx={{
                              color: 'text.secondary',
                              fontSize: { xs: '0.7rem', sm: '0.75rem' },
                            }}
                          >
                            Active {candidate.active}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Card>
                ))}
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ForRecruiters;
