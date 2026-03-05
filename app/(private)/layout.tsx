'use client';

import { Box } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import Navigation from './components/Navigation';
import AuthenticatedLayout from './components/AuthenticatedLayout';
import PageContainer from '@/app/components/PageContainer';

export default function AuthenticatedLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode {
  const searchParams = useSearchParams();
  const hideNavigation = searchParams.get('nav') === 'false';

  return (
    <AuthenticatedLayout>
      <Box
        sx={{
          height: '100dvh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {!hideNavigation && <Navigation />}
        <Box
          sx={{
            flex: 1,
            minHeight: 0,
            display: 'flex',
            flexDirection: 'column',
            overflowX: 'hidden',
            overflowY: 'auto',
            scrollbarWidth: 'thin',
            scrollbarColor: '#98A2B3 transparent',
            '&::-webkit-scrollbar': {
              width: '8px',
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: 'transparent',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#98A2B3',
              borderRadius: '8px',
              border: '2px solid transparent',
              backgroundClip: 'content-box',
              minHeight: '48px',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              backgroundColor: '#667085',
            },
          }}
        >
          <PageContainer>{children}</PageContainer>
        </Box>
      </Box>
    </AuthenticatedLayout>
  );
}
