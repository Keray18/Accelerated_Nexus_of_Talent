'use client';

import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Link,
} from '@mui/material';
import { Bolt } from '@mui/icons-material';

const Footer = () => {
  const footerLinks = {
    Product: [
      'For Candidates',
      'For Recruiters',
      'Freelance Marketplace',
      'Pricing',
    ],
    Resources: [
      'Documentation',
      'API',
      'Blog',
      'Community',
    ],
    Company: [
      'About',
      'Careers',
      'Privacy',
      'Terms',
    ],
  };

  return (
    <Box
      sx={{
        py: { xs: 6, md: 8 },
        background: 'linear-gradient(180deg, #0f0f1a 0%, #0a0a0f 100%)',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 3, md: 4 }}>
          {/* Brand Column */}
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <Bolt sx={{ color: '#00ffff', fontSize: { xs: 24, md: 28 } }} />
              <Typography
                variant="h6"
                sx={{
                  color: '#00ffff',
                  fontWeight: 600,
                  fontSize: { xs: '1.1rem', md: '1.25rem' },
                }}
              >
                SkillQuest
              </Typography>
            </Box>
            <Typography
              variant="body2"
              sx={{
                color: 'text.secondary',
                mb: 3,
                lineHeight: 1.8,
                maxWidth: { xs: '100%', md: '300px' },
                fontSize: { xs: '0.875rem', md: '0.9375rem' },
              }}
            >
              Level up your tech career through verified skills and real work. The future of hiring is here.
            </Typography>
            {/* Social Icons */}
            <Box sx={{ display: 'flex', gap: 2 }}>
              {['GitHub', 'Twitter', 'LinkedIn'].map((social) => (
                <Box
                  key={social}
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'text.secondary',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      borderColor: '#00ffff',
                      color: '#00ffff',
                    },
                  }}
                >
                  <Typography variant="caption" sx={{ fontSize: '0.75rem' }}>
                    {social === 'GitHub' ? 'G' : social === 'Twitter' ? 'T' : 'L'}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Grid>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <Grid item xs={6} sm={4} md={2.67} key={category}>
              <Typography
                variant="subtitle2"
                sx={{
                  color: 'text.primary',
                  fontWeight: 700,
                  mb: 2,
                  fontSize: { xs: '0.875rem', md: '0.95rem' },
                }}
              >
                {category}
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {links.map((link) => (
                  <Link
                    key={link}
                    href="#"
                    sx={{
                      color: 'text.secondary',
                      textDecoration: 'none',
                      fontSize: { xs: '0.8rem', md: '0.9rem' },
                      transition: 'color 0.3s ease',
                      '&:hover': {
                        color: '#00ffff',
                      },
                    }}
                  >
                    {link}
                  </Link>
                ))}
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* Bottom Bar */}
        <Box
          sx={{
            mt: 6,
            pt: 4,
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 2,
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              fontSize: '0.875rem',
            }}
          >
            © 2024 SkillQuest. All rights reserved.
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              fontSize: '0.875rem',
            }}
          >
            Built for developers who{' '}
            <Box component="span" sx={{ color: '#00ffff' }}>
              ship.
            </Box>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
