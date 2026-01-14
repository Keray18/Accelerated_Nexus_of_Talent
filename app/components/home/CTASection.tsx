'use client';

import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Chip,
} from '@mui/material';
import { ArrowForward, Bolt, GpsFixed } from '@mui/icons-material';


const CTASection = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        position: 'relative',
        background: 'linear-gradient(180deg, #0a0a0f 0%, #0f0f1a 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        pt: { xs: 12, md: 10, lg: 16 },
        pb: { xs: 6, md: 8, lg: 12 },
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
            radial-gradient(circle at 20% 30%, rgba(0, 255, 255, 0.1) 1px, transparent 1px),
            radial-gradient(circle at 80% 70%, rgba(0, 255, 255, 0.08) 1px, transparent 1px),
            radial-gradient(circle at 40% 80%, rgba(156, 39, 176, 0.1) 1px, transparent 1px),
            radial-gradient(circle at 60% 20%, rgba(0, 255, 255, 0.06) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px, 60px 60px, 45px 45px, 55px 55px',
          pointerEvents: 'none',
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: 2,
          }}
        >

          {/* Main Headline */}
          <Box>
            <Typography
              variant="h1"
              sx={{
                color: 'text.primary',
                mb: 1,
                fontSize: { xs: '2.5rem', md: '4rem', lg: '5rem' },
                fontWeight: 700,
              }}
            >
              Level Up Your
            </Typography>
            <Typography
              variant="h1"
              sx={{
                background: 'linear-gradient(90deg, #00ffff 0%, #33ffff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                fontSize: { xs: '2.5rem', md: '4rem', lg: '5rem' },
                fontWeight: 700,
                textShadow: '0 0 30px rgba(0, 255, 255, 0.5)',
              }}
            >
              Tech Career
            </Typography>
          </Box>

          {/* Description */}
          <Typography
            variant="body1"
            sx={{
              color: 'text.primary',
              maxWidth: '700px',
              fontSize: { xs: '1rem', md: '1.125rem' },
              lineHeight: 1.8,
            }}
          >
            A skill-progression and reputation system where verified effort earns
            you real opportunities. No resumes. No fluff. Just{' '}
            <Box
              component="span"
              sx={{
                color: 'primary.main',
                fontWeight: 600,
              }}
            >
              proof of ability.
            </Box>
          </Typography>

          {/* CTA Buttons */}
          <Box
            sx={{
              display: 'flex',
              gap: 2,
              flexDirection: { xs: 'column', sm: 'row' },
              mt: 2,
            }}
          >
            <Button
              variant="contained"
              size="large"
              endIcon={<ArrowForward />}
              sx={{
                background: 'linear-gradient(90deg, #00ffff 0%, #9c27b0 100%)',
                color: 'white',
                px: { xs: 3, sm: 4 },
                py: { xs: 1.25, sm: 1.5 },
                fontSize: { xs: '0.9rem', sm: '1rem' },
                fontWeight: 600,
                borderRadius: '8px',
                boxShadow: '0 4px 20px rgba(0, 255, 255, 0.4)',
                width: { xs: '100%', sm: 'auto' },
                '&:hover': {
                  background: 'linear-gradient(90deg, #33ffff 0%, #ba68c8 100%)',
                  boxShadow: '0 6px 30px rgba(0, 255, 255, 0.6)',
                },
              }}
            >
              START YOUR JOURNEY →
            </Button>
            <Button
              variant="outlined"
              size="large"
              sx={{
                borderColor: '#00ffff',
                color: 'white',
                px: { xs: 3, sm: 4 },
                py: { xs: 1.25, sm: 1.5 },
                fontSize: { xs: '0.9rem', sm: '1rem' },
                fontWeight: 600,
                borderWidth: '1px',
                borderRadius: '8px',
                width: { xs: '100%', sm: 'auto' },
                '&:hover': {
                  borderColor: '#33ffff',
                  backgroundColor: 'rgba(0, 255, 255, 0.1)',
                  borderWidth: '1px',
                },
              }}
            >
              I'M A RECRUITER Ⓒ
            </Button>
          </Box>

          {/* Statistics */}
          <Grid
            container
            spacing={{ xs: 3, sm: 4 }}
            sx={{
              mt: { xs: 6, md: 8 },
              maxWidth: '900px',
            }}
          >
            <Grid item xs={12} sm={4}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Typography
                  variant="h2"
                  sx={{
                    color: 'primary.main',
                    fontWeight: 700,
                    fontSize: { xs: '2.5rem', md: '3.5rem' },
                    textShadow: '0 0 20px rgba(0, 255, 255, 0.5)',
                  }}
                >
                  12K+
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: 'text.primary',
                    mt: 1,
                    fontSize: '1rem',
                  }}
                >
                  Active Players
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Typography
                  variant="h2"
                  sx={{
                    color: 'primary.main',
                    fontWeight: 700,
                    fontSize: { xs: '2.5rem', md: '3.5rem' },
                    textShadow: '0 0 20px rgba(0, 255, 255, 0.5)',
                  }}
                >
                  500+
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: 'text.primary',
                    mt: 1,
                    fontSize: '1rem',
                  }}
                >
                  Hirings Made
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Typography
                  variant="h2"
                  sx={{
                    color: 'primary.main',
                    fontWeight: 700,
                    fontSize: { xs: '2.5rem', md: '3.5rem' },
                    textShadow: '0 0 20px rgba(0, 255, 255, 0.5)',
                  }}
                >
                  85%
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: 'text.primary',
                    mt: 1,
                    fontSize: '1rem',
                  }}
                >
                  Faster Hiring
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default CTASection;

