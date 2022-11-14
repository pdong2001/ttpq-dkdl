import { Box } from '@chakra-ui/react';
import { ReactNode } from 'react';
import NavBar from '~/components/Navbar';
const NoFooterLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Box maxW={'full'}>
      <NavBar />
      {children}
    </Box>
  );
};

export default NoFooterLayout;
