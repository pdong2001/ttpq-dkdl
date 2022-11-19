import { ReactNode, useState, useEffect } from 'react';
import {
  Box,
  Flex,
  HStack,
  IconButton,
  useDisclosure,
  useColorModeValue,
  Text,
  Stack,
  useColorMode,
  Link,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import Logo from '../Logo';
import { nanoid } from '@reduxjs/toolkit';
import { HashLink } from 'react-router-hash-link';

const Links = [
  { title: 'Trang chủ', to: '/#' },
  { title: 'Giới thiệu', to: '/#eventInfo' },
  { title: 'Ban đại lễ', to: '/#departmentInfo' },
  { title: 'Chương trình', to: '/#timeline' },
];

const NavLink = ({ children, to }: { children: ReactNode; to: string }) => (
  <Link
    as={HashLink}
    smooth
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
    }}
    to={to}
  >
    <Text as="b" textTransform={'uppercase'} fontSize="14px">{children}</Text>
  </Link>
);

export default function NavBar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const [navbar_bg, setNavbarBg] = useState('rgba(0,0,0,0.8)');
  const changeBackground = () => {
    const delta = 100;
    if (window.scrollY >= delta) {
      setNavbarBg('yellow.500');
    } else if (window.scrollY < delta && window.scrollY >= 50) {
      setNavbarBg('rgba(214, 158, 46,'+(window.scrollY / delta / 4)+')');
    } else {
      setNavbarBg('rgba(0,0,0,0.6)');
    }
  }
  useEffect(() => {
    changeBackground()
    // adding the event when scroll change background
    window.addEventListener("scroll", changeBackground)
    return ()=>{
      window.removeEventListener("scroll", changeBackground);
    }
  })
  return (
    <>
      {/* <Box background='transparent' height={16}></Box> */}
      <Box
        bg={navbar_bg}
        color={'white'}
        px={4}
        pos={'fixed'}
        top={0}
        zIndex={200}
        w={'full'}
        boxShadow='sm'
      >
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'} px={{md: 24}}>
            <Logo />
            <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
              {Links.map((nav) => (
                <NavLink to={nav.to} key={nanoid()}>
                  {nav.title}
                </NavLink>
              ))}
            </HStack>
          </HStack>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links.map((link) => (
                <NavLink key={nanoid()} to={link.to}>
                  {link.title}
                </NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
