'use client';

import { Box, CircularProgress } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useAuth } from '@/app/components/AuthContext';
import { CREDIT_FLOW_URLS } from '@/app/config/client/credit-flow';
import { THEME_CONFIG } from '@/app/config/theme';

export default function CreditPage(): React.ReactNode {
  const { token } = useAuth();
  const [isIframeLoaded, setIsIframeLoaded] = useState<boolean>(false);
  const fixedHeight = '1000px';
  const firstFlowUrl = CREDIT_FLOW_URLS[0];

  const firstFlowUrlWithToken = useMemo(() => {
    if (!firstFlowUrl || !token) {
      return '';
    }

    const parsedUrl = new URL(firstFlowUrl);
    parsedUrl.searchParams.set('token', token);
    return parsedUrl.toString();
  }, [firstFlowUrl, token]);

  useEffect(() => {
    setIsIframeLoaded(false);
  }, [firstFlowUrlWithToken]);

  const handleIframeLoad = (): void => {
    setIsIframeLoaded(true);
  };

  if (!firstFlowUrlWithToken) {
    return (
      <Box
        sx={{
          width: '100%',
          height: '100%',
          flex: 1,
          minHeight: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CircularProgress
          sx={{
            color: THEME_CONFIG.palette.line.main,
            '& .MuiCircularProgress-circle': {
              strokeLinecap: 'round',
            },
          }}
        />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: '100%',
        height: fixedHeight,
        display: 'block',
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '10px',
      }}
    >
      {!isIframeLoaded && (
        <Box
          sx={{
            position: 'fixed',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1200,
            pointerEvents: 'none',
          }}
        >
          <CircularProgress
            sx={{
              color: THEME_CONFIG.palette.line.main,
              '& .MuiCircularProgress-circle': {
                strokeLinecap: 'round',
              },
            }}
          />
        </Box>
      )}
      <iframe
        onLoad={handleIframeLoad}
        src={firstFlowUrlWithToken}
        title="credit-flow-step-1"
        style={{
          width: '100%',
          height: fixedHeight,
          border: 0,
          display: 'block',
          visibility: isIframeLoaded ? 'visible' : 'hidden',
          borderRadius: 'inherit',
        }}
        scrolling="no"
      />
    </Box>
  );
}
