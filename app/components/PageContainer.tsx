import { Container, ContainerProps, SxProps, Theme } from '@mui/material';
import { ReactNode } from 'react';

interface PageContainerProps {
  children: ReactNode;
  maxWidth?: ContainerProps['maxWidth'];
  sx?: SxProps<Theme>;
}

export default function PageContainer({
  children,
  maxWidth = 'md',
  sx,
}: PageContainerProps): React.ReactNode {
  return (
    <Container
      maxWidth={maxWidth}
      sx={{
        px: { xs: '20px', md: '40px' },
        py: { xs: '40px', md: '80px' },
        ...sx,
      }}
    >
      {children}
    </Container>
  );
}
