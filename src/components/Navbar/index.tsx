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
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  useColorModeValue,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import Logo from '../Logo';
import { nanoid } from '@reduxjs/toolkit';
import { HashLink } from 'react-router-hash-link';
import { useParams, useRouteMatch } from 'react-router-dom';
import { ADD_NEW_REGISTER_PATH, EDIT_REGISTER_PATH, HOME_WITH_SHORT_URI } from '~/routes';
import { BiLogOutCircle, BiQr, BiUserCircle } from 'react-icons/bi';

const NavLink = ({ children, to, onClick }: { children: ReactNode; to: string; onClick?: any }) => (
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
const delta = window.innerHeight / 5;

export default function NavBar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const isLight = colorMode === 'light';
  const { shortUri = '' } = useParams<any>();
  const { path } = useRouteMatch();
  const isRegisterPage = [ADD_NEW_REGISTER_PATH, EDIT_REGISTER_PATH].includes(path);
  const isHomePage = [HOME_WITH_SHORT_URI, '/'].includes(path);
  const Links = [
    { title: 'Trang chủ', to: `/${shortUri}#` },
    { title: 'Giới thiệu', to: `/${shortUri}#eventInfo` },
    { title: 'Các công việc', to: `/${shortUri}#departmentInfo` },
    { title: 'Chương trình', to: `/${shortUri}#timeline` },
  ];

  const [navBarBg, setNavbarBg] = useState('blue.500');
  const isChangeMode = window.scrollY < delta && window.scrollY >= 50;
  const changeBackground = () => {
    if (window.scrollY >= delta || isRegisterPage) {
      setNavbarBg('blue.500');
      if (!isLight) {
        toggleColorMode();
      }
    } else if (isChangeMode) {
      setNavbarBg('gray.900');
      // setNavbarBg('rgba(214, 158, 46,' + window.scrollY / delta / 4 + ')');
    } else {
      if (isHomePage) {
        setNavbarBg('gray.900');
        if (isLight) {
          toggleColorMode();
        }
      }
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
        bg={navBarBg}
        pos={'fixed'}
        top={0}
        zIndex={200}
        w={'full'}
        boxShadow='md'
        opacity={0.97}
        color={useColorModeValue('white', 'blue.300')}
      >
        {/* <Container maxW={'6xl'} px={[3, 5, 16, 20, 0]}> */}
        <Box px={4}>
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
                  <NavLink to={nav.to} key={nanoid()}>
                    {nav.title}
                  </NavLink>
                ))}
              </HStack>
            </HStack>

            <Menu>
              <MenuButton as={Button} rounded={'full'} variant={'link'} cursor={'pointer'} minW={0}>
                <Avatar
                  size={'sm'}
                  src={
                    'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                  }
                />
              </MenuButton>
              <MenuList color={useColorModeValue('blue.500', 'blue.300')}>
                <MenuItem>
                  <HStack spacing={1}>
                    <BiQr /> <span>Mã QR cá nhân</span>
                  </HStack>
                </MenuItem>
                <MenuItem>
                  <HStack spacing={1}>
                    <BiUserCircle /> <span>Thông tin đăng ký</span>
                  </HStack>
                </MenuItem>
                <MenuDivider />
                <MenuItem>
                  <HStack spacing={1}>
                    <BiLogOutCircle /> <span>Đăng xuất</span>
                  </HStack>
                </MenuItem>
              </MenuList>
            </Menu>
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
        </Box>
      </Box>
    </>
  );
}
