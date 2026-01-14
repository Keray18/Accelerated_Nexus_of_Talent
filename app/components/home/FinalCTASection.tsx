'use client';

import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
} from '@mui/material';
import { ArrowForward, AutoAwesome } from '@mui/icons-material';

const FinalCTASection = () => {
  return (
    <Box
      sx={{
        py: { xs: 10, md: 16 },
        background: 'linear-gradient(180deg, #0a0a0f 0%, #0f0f1a 100%)',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Background glow effect */}
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '300px', sm: '450px', md: '600px' },
          height: { xs: '300px', sm: '450px', md: '600px' },
          background: 'radial-gradient(circle, rgba(0, 255, 255, 0.15) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Background dots */}
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

      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
        {/* Icon */}
        <Box
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: { xs: 56, md: 64 },
            height: { xs: 56, md: 64 },
            borderRadius: '12px',
            border: '2px solid rgba(0, 255, 255, 0.3)',
            mb: 3,
          }}
        >
          <AutoAwesome sx={{ fontSize: { xs: 28, md: 32 }, color: '#00ffff' }} />
        </Box>

        {/* Main Heading */}
        <Typography
          variant="h1"
          sx={{
            color: 'text.primary',
            fontWeight: 700,
            fontSize: { xs: '2.5rem', md: '3.5rem', lg: '4rem' },
            mb: 2,
          }}
        >
          Ready to{' '}
          <Box
            component="span"
            sx={{
              background: 'linear-gradient(90deg, #00ffff 0%, #33ffff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Level Up?
          </Box>
        </Typography>

        {/* Supporting Text */}
        <Typography
          variant="body1"
          sx={{
            color: 'text.secondary',
            fontSize: { xs: '1rem', md: '1.125rem' },
            mb: 4,
            lineHeight: 1.8,
            maxWidth: '600px',
            mx: 'auto',
          }}
        >
          Join thousands of developers building their reputation through real work, not resume keywords.
        </Typography>

        {/* CTA Buttons */}
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'center',
            mb: 3,
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
            CREATE YOUR PROFILE →
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
            SEE HOW IT WORKS
          </Button>
        </Box>

        {/* Disclaimer */}
        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
            fontSize: '0.9rem',
          }}
        >
          Free to join • No credit card required • Start earning XP today
        </Typography>
      </Container>
    </Box>
  );
};

export default FinalCTASection;
