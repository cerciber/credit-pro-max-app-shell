'use client';

import { Box, CircularProgress } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useAuth } from '@/app/components/AuthContext';
import { CREDIT_FLOW_URLS } from '@/app/config/client/credit-flow';
import { THEME_CONFIG } from '@/app/config/theme';

function getScrollParent(element: HTMLElement | null): HTMLElement | null {
  if (!element) return null;
  let parent = element.parentElement;
  while (parent) {
    const { overflowY } = getComputedStyle(parent);
    if (overflowY === 'auto' || overflowY === 'scroll' || overflowY === 'overlay') {
      return parent;
    }
    parent = parent.parentElement;
  }
  return null;
}

export default function CreditPage(): React.ReactNode {
  const router = useRouter();
  const { token } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);
  const currentStepRef = useRef(currentStep);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isIframeLoaded, setIsIframeLoaded] = useState<boolean>(false);
  const fixedHeight = '1000px';
  const currentFlowUrl = CREDIT_FLOW_URLS[currentStep];

  currentStepRef.current = currentStep;

  const currentFlowUrlWithToken = useMemo(() => {
    if (!currentFlowUrl || !token) {
      return '';
    }

    const parsedUrl = new URL(currentFlowUrl);
    parsedUrl.searchParams.set('token', token);
    return parsedUrl.toString();
  }, [currentFlowUrl, token]);

  useEffect(() => {
    setIsIframeLoaded(false);
  }, [currentFlowUrlWithToken]);

  const scrollToTop = (): void => {
    const scrollParent = containerRef.current
      ? getScrollParent(containerRef.current)
      : null;
    if (scrollParent) {
      scrollParent.scrollTo({ top: 0, behavior: 'smooth' });
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleMessage = (event: MessageEvent): void => {
      if (event.data?.type !== 'CREDIT_FLOW_CONTINUE') return;
      const step = currentStepRef.current;
      const next = step + 1;
      if (next < CREDIT_FLOW_URLS.length) {
        setIsIframeLoaded(false);
        scrollToTop();
        setCurrentStep(next);
      } else {
        router.push('/home');
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [router]);

  const handleIframeLoad = (): void => {
    setIsIframeLoaded(true);
  };

  if (!currentFlowUrlWithToken) {
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
      ref={containerRef}
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
        key={currentStep}
        onLoad={handleIframeLoad}
        src={currentFlowUrlWithToken}
        title={`credit-flow-step-${currentStep + 1}`}
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
