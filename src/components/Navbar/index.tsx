import { ReactNode } from 'react';
import {
  Box,
  Flex,
  HStack,
  IconButton,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Link,
  Button,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import Logo from '../Logo';
import { nanoid } from '@reduxjs/toolkit';
import { NavBarLink } from '~/routes';

const Links = [
  { title: 'Trang chủ', to: '/' },
  { title: 'Giới thiệu Đại lễ', to: 'eventInfo' },
  { title: 'Các công việc Đại lễ', to: 'departmentInfo' },
  { title: 'Chương trình Đại lễ', to: 'timeline' },
];

const NavLink = ({ children, toId }: { children: ReactNode; toId: string }) => (
  <Link
    onClick={(e) => {
      const ele = document.getElementById(toId);
      console.log('element__', ele);

      ele?.scrollIntoView({ behavior: 'smooth' });
    }}
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
  >
    {children}
  </Link>
);

export default function NavBar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <>
      <Box background='transparent' height={16}></Box>
      <Box
        bg={useColorModeValue('gray.100', 'gray.900')}
        px={4}
        pos={'fixed'}
        top={0}
        zIndex={200}
        w={'full'}
        boxShadow='sm'
        opacity='0.98'
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
              {Links.map((nav) => (
                <NavLink toId={nav.to} key={nanoid()}>
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
                <NavLink key={nanoid()} toId={link.to}>
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
