import { Box } from '@chakra-ui/react';
import { ReactNode } from 'react';
import Footer from '~/components/Footer';
import NavBar from '~/components/Navbar';
const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Box maxW={'full'}>
      <NavBar />
      {children}
      <Footer />
    </Box>
  );
};

export default MainLayout;
