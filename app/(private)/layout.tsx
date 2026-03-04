'use client';

import { Box } from '@mui/material';
import Navigation from './components/Navigation';
import AuthenticatedLayout from './components/AuthenticatedLayout';

export default function AuthenticatedLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode {
  return (
    <AuthenticatedLayout>
      <Navigation />
      <Box
        sx={{
          width: '100%',
          height: 'calc(100dvh - 72px)',
          overflow: 'hidden',
        }}
      >
        {children}
      </Box>
    </AuthenticatedLayout>
  );
}
