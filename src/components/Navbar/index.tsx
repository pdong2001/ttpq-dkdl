import { ReactNode, useState, useEffect } from 'react';
import {
  Box,
  HStack,
  IconButton,
  useDisclosure,
  Text,
  Stack,
  useColorMode,
  Link,
  Container,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import Logo from '../Logo';
import { nanoid } from '@reduxjs/toolkit';
import { HashLink } from 'react-router-hash-link';
import { useParams, useRouteMatch } from 'react-router-dom';
import { ADD_NEW_REGISTER_PATH, EDIT_REGISTER_PATH } from '~/routes';

const NavLink = ({ children, to, onClick }: { children: ReactNode; to: string; onClick: any }) => (
  <Link
    as={HashLink}
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
    }}
    to={to}
    scroll={(el) => {
      setTimeout(() => {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }}
    onClick={onClick}
  >
    <Text as='b' textTransform={'uppercase'} fontSize='14px'>
      {children}
    </Text>
  </Link>
);

export default function NavBar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { shortUri = '' } = useParams<any>();
  const { path } = useRouteMatch();
  const isRegisterPage = [ADD_NEW_REGISTER_PATH, EDIT_REGISTER_PATH].includes(path);
  const Links = [
    { title: 'Trang chủ', to: `/${shortUri}#` },
    { title: 'Giới thiệu', to: `/${shortUri}#eventInfo` },
    { title: 'Các công việc', to: `/${shortUri}#departmentInfo` },
    { title: 'Chương trình', to: `/${shortUri}#timeline` },
  ];
  const { colorMode, toggleColorMode } = useColorMode();
  const [navbar_bg, setNavbarBg] = useState('rgba(0,0,0)');
  const changeBackground = () => {
    const delta = 100;
    if (window.scrollY >= delta || isRegisterPage) {
      setNavbarBg('blue.500');
    } else if (window.scrollY < delta && window.scrollY >= 50) {
      setNavbarBg('rgba(214, 158, 46,' + window.scrollY / delta / 4 + ')');
    } else {
      setNavbarBg('rgba(0,0,0,0.6)');
    }
  };
  useEffect(() => {
    changeBackground();
    // adding the event when scroll change background
    window.addEventListener('scroll', changeBackground);
    return () => {
      window.removeEventListener('scroll', changeBackground);
    };
  });
  return (
    <>
      {/* <Box background='transparent' height={16}></Box> */}
      <Box
        bg={navbar_bg}
        color={'white'}
        pos={'fixed'}
        top={0}
        zIndex={200}
        w={'full'}
        boxShadow='sm'
      >
        <Container maxW={'6xl'} px={[3, 5, 16, 20, 0]}>
          <HStack h={16} alignItems={'center'} justifyContent={'space-between'}>
            <IconButton
              size={'md'}
              icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
              aria-label={'Open Menu'}
              display={{ md: 'none' }}
              onClick={isOpen ? onClose : onOpen}
            />
            <HStack spacing={8} alignItems={'center'}>
              <Logo />
              <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
                {Links.map((nav) => (
                  <NavLink to={nav.to} key={nanoid()} onClick={() => {}}>
                    {nav.title}
                  </NavLink>
                ))}
              </HStack>
            </HStack>
          </HStack>

          {isOpen ? (
            <Box pb={4} display={{ md: 'none' }}>
              <Stack as={'nav'} spacing={4}>
                {Links.map((link) => (
                  <NavLink key={nanoid()} to={link.to} onClick={onClose}>
                    {link.title}
                  </NavLink>
                ))}
              </Stack>
            </Box>
          ) : null}
        </Container>
      </Box>
    </>
  );
}
