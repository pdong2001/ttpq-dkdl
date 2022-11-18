import { ReactNode } from 'react';
import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  Link,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import React from 'react';
import Logo from '../Logo';
import { nanoid } from '@reduxjs/toolkit';
import { Link as RouterLink } from 'react-router-dom';
import { NavBarLink } from '~/routes';

const Links = [
  { title: 'Trang chủ', to: '/' },
  { title: 'Giới thiệu đại lễ', to: 'EVENT_INFO' },
  { title: 'Các ban Đại lễ', to: 'DEPARTMENT_INFO' },
  { title: 'Thời khóa', to: 'TIMELINE' },
];

const NavLink = ({ children, to }: { children: ReactNode; to: string }) => (
  <Link
    as={RouterLink}
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    to={to}
  >
    {children}
  </Link>
);

export default function NavBar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <>
      <Box
        bg={useColorModeValue('gray.100', 'gray.900')}
        px={4}
        pos={'fixed'}
        zIndex={200}
        mb={3}
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
          <HStack spacing={8} alignItems={'center'}>
            <Logo />
            <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
              {NavBarLink.map((nav) => (
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
