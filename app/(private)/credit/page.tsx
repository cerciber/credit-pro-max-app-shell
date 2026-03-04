'use client';

import { Box, CircularProgress } from '@mui/material';
import { useMemo } from 'react';
import { useAuth } from '@/app/components/AuthContext';
import { CREDIT_FLOW_URLS } from '@/app/config/client/credit-flow';

export default function CreditPage(): React.ReactNode {
  const { token } = useAuth();
  const firstFlowUrl = CREDIT_FLOW_URLS[0];

  const firstFlowUrlWithToken = useMemo(() => {
    if (!firstFlowUrl || !token) {
      return '';
    }

    const parsedUrl = new URL(firstFlowUrl);
    parsedUrl.searchParams.set('token', token);
    return parsedUrl.toString();
  }, [firstFlowUrl, token]);

  if (!firstFlowUrlWithToken) {
    return (
      <Box
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CircularProgress color="inherit" />
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%', height: '100%', overflow: 'hidden' }}>
      <iframe
        src={firstFlowUrlWithToken}
        title="credit-flow-step-1"
        style={{ width: '100%', height: '100%', border: 0 }}
      />
    </Box>
  );
}
