import { ReactNode, useState, useEffect, useContext } from 'react';
import {
  Box,
  HStack,
  IconButton,
  useDisclosure,
  Text,
  Stack,
  Link,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  MenuIcon,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import Logo from '../Logo';
import { nanoid } from '@reduxjs/toolkit';
import { HashLink } from 'react-router-hash-link';
import { useHistory, useParams, useRouteMatch } from 'react-router-dom';
import { ADD_NEW_REGISTER_PATH, EDIT_REGISTER_PATH, HOME_WITH_SHORT_URI } from '~/routes';
import { BiLogOutCircle, BiQr, BiUserCircle } from 'react-icons/bi';
import { useAppSelector } from '~/hooks/reduxHook';
import { AuthContext } from '~/providers/auth';
import SuccessRegisterModal from '../Modals/SuccessRegisterModal';
import API from '~/apis/constants';
import { formatUrl } from '~/utils/functions';

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
const delta = window.innerHeight / 1.5;

export default function NavBar() {
  const history = useHistory();
  const registerPage = useAppSelector((state) => state.registerPage.data);
  const { isOpen, onOpen, onClose } = useDisclosure();
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

  const { login, logout, member } = useContext(AuthContext);

  const [navBarBg, setNavbarBg] = useState('blue.500');
  const [color, setColor] = useState('blue.500');
  const isChangeMode = window.scrollY < delta && window.scrollY >= 50;
  const changeBackground = () => {
    const isOver = window.scrollY >= delta || isRegisterPage;

    // const delta = 100;
    if (isOver) {
      setNavbarBg('blue.500');
      setColor('white');
    } else if (isChangeMode) {
      setNavbarBg('rgba(214, 158, 46,' + window.scrollY / delta / 4 + ')');
    } else {
      setNavbarBg('rgba(0,0,0,0.6)');
      setColor('white');
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

  const [openQR, setOpenQR] = useState(false);
  const showQR = () => {
    setOpenQR(true);
  };
  return (
    <>
      {/* <Box background='transparent' height={16}></Box> */}
      <Box bg={navBarBg} pos={'fixed'} top={0} zIndex={200} w={'full'} boxShadow='md' color={color}>
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
            {member.userToken ? (
              <Menu>
                <MenuButton cursor={'pointer'} minW={0}>
                  <HStack color='white'>
                    <Text>{`Xin chào, ${member.fullName}`}</Text>
                    <Avatar size={'sm'} src={member.avatarPath} />
                  </HStack>
                </MenuButton>
                <MenuList color={'blue.500'}>
                  <MenuItem onClick={showQR}>
                    <HStack spacing={1}>
                      {registerPage.eventId ? (
                        <>
                          <BiQr /> <span>Mã QR cá nhân</span>
                        </>
                      ) : (
                        <>
                          <BiUserCircle /> <span>Thông tin cá nhân</span>
                        </>
                      )}
                    </HStack>
                  </MenuItem>
                  {registerPage.eventId && (
                    <>
                      <MenuItem
                        onClick={() => {
                          const registerInfoPath = `/register-info/${member.register?.id}`;
                          history.push(registerInfoPath);
                        }}
                      >
                        <HStack spacing={1}>
                          <BiUserCircle /> <span>Thông tin đăng ký</span>
                        </HStack>
                      </MenuItem>
                      <MenuDivider />
                    </>
                  )}
                  <MenuItem onClick={logout}>
                    <HStack spacing={1}>
                      <BiLogOutCircle /> <span>Đăng xuất</span>
                    </HStack>
                  </MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <Button
                colorScheme={window.scrollY >= delta || isRegisterPage ? 'yellow' : 'whiteAlpha'}
                onClick={() => login()}
              >
                Đăng nhập
              </Button>
            )}
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
        <SuccessRegisterModal
          open={openQR}
          onClose={() => {
            setOpenQR(false);
          }}
          title={`${registerPage.eventId ? 'Thông tin đăng ký' : 'Thông tin cá nhân'}`}
          isCentered={!registerPage.eventId}
        />
      </Box>
    </>
  );
}
