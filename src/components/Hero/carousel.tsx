import React, { useEffect, useState } from 'react';
import {
  Box,
  useBreakpointValue,
  Stack,
  Heading,
  Text,
  Button,
  createIcon,
  HStack,
  Show,
  Container,
} from '@chakra-ui/react';
// And react-slick as our Carousel Lib
import Slider from 'react-slick';
import slider1 from '~/assets/cover.jpg';
import slider2 from '~/assets/cover_2.jpg';

import FadeInUp from '~/components/Animation/FadeInUp';
import Step1 from '~/pages/MultiStepRegister/RegisterSteps/Step1';
import { useHistory, useRouteMatch, useParams } from 'react-router-dom';
import { HOME_WITH_SHORT_URI, ADD_NEW_REGISTER_PATH } from '~/routes';
import { formatUrl } from '~/utils/functions';
import { FaArrowRight } from 'react-icons/fa';
import { HashLink } from 'react-router-hash-link';
import { useAppDispatch } from '~/hooks/reduxHook';
import API from '~/apis/constants';
import { getRegisterPage } from '~/slices/registerPage';
import { unwrapResult } from '@reduxjs/toolkit';
export default function CaptionCarousel() {
  const history = useHistory();
  const { path } = useRouteMatch();
  const { shortUri = '' } = useParams<any>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (shortUri) {
      dispatch(
        getRegisterPage({
          method: 'get',
          url: formatUrl(API.GET_REGISTER_PAGE, { shortUri }),
        }),
      )
        .then(unwrapResult)
        .catch(() => {
          history.push('/not-found');
        });
    }
  }, [shortUri]);

  // As we have used custom buttons, we need a reference variable to
  // change the state
  const [slider, setSlider] = React.useState<Slider | null>(null);
  const [fade_index, setFadeIndex] = React.useState<number>(0);

  // These are the breakpoints which changes the position of the
  // buttons as the screen size changes
  const top = useBreakpointValue({ base: '95%', md: '50%' });
  const side = useBreakpointValue({ base: '-40px', md: '10px', lg: '20px', xl: '10%' });

  // Settings for the slider
  const settings = {
    dots: false,
    arrows: false,
    // fade: true,
    infinite: true,
    // autoplay: true,
    speed: 800,
    // autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: function (old_index: number, new_index: number) {
      setFadeIndex(new_index);
    },
  };
  const isHomePage = path === HOME_WITH_SHORT_URI;
  const nextStep = () => {
    if (isHomePage) {
      history.push(formatUrl(ADD_NEW_REGISTER_PATH, { shortUri }));
    }
    window.scrollTo(0, 0);
  };

  // This list contains all the data for carousels
  // This can be static or loaded from a server
  const cards = [
    {
      title: 'Ban công quả',
      text: 'Để có một Đại Lễ thành công, phía sau đó là sự cống hiến, hy sinh, phụng sự của biết bao bạn thanh niên, sinh viên với nhiệt huyết tuổi trẻ và tinh thần phụng sự hăng say.',
      image: slider2,
    },
    {
      title: 'Đêm thành đạo',
      text: 'Cả núi rừng im phăng phắc, không một làn gió nhẹ, dường như mọi động thực vật tất thảy đều ngủ say.',
      image: slider1,
    },
  ];

  const [openRegisterForm, setOpenRegisterForm] = useState(false);

  return (
    <Box position={'relative'} minH={'100vh'} width={'full'}>
      {/* Left Icon */}
      <Box
        color='white'
        _hover={{
          bg: 'whiteAlpha.300',
        }}
        aria-label='left-arrow'
        position='absolute'
        left={side}
        top={top}
        transform={'translate(0%, -50%)'}
        zIndex={2}
        onClick={() => slider?.slickPrev()}
        borderRadius='50%'
        w={10}
        height={10}
        cursor='pointer'
        border='2px solid'
      ></Box>
      {/* Right Icon */}
      <Box
        color='white'
        _hover={{
          bg: 'whiteAlpha.300',
        }}
        aria-label='right-arrow'
        position='absolute'
        right={side}
        top={top}
        transform={'translate(0%, -50%)'}
        zIndex={2}
        onClick={() => slider?.slickNext()}
        borderRadius='50%'
        w={10}
        height={10}
        cursor='pointer'
        border='2px solid'
      ></Box>
      {/* Slider */}
      <Slider {...settings} ref={(slider) => setSlider(slider)}>
        {cards.map((card, index) => (
          <Box
            key={index}
            backgroundImage={`url(${card.image})`}
            backgroundPosition={{ base: 'center' }}
            backgroundRepeat='no-repeat'
            backgroundSize='cover'
            transitionDuration={'2s'}
          >
            <Box bg='rgba(0,0,0, 0.45)'>
              <Container maxW='6xl' position='relative' px={[3, 5, 16, 20, 0]}>
                {/* This is the block you need to change, to customize the caption */}
                <Box height='100vh' position='relative' justifyContent={'start'}>
                  <Show {...(isHomePage ? { above: 'md' } : {})}>
                    <Stack
                      color='white'
                      spacing={6}
                      w={isHomePage ? { base: '40%', md: '35%', lg: '45%' } : { base: '80%' }}
                      maxW={'640px'}
                      position='absolute'
                      top='50%'
                      transform='translate(0, -50%)'
                    >
                      {fade_index == index && (
                        <Box>
                          <FadeInUp duration={1.5}>
                            <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
                              {card.title}
                            </Heading>
                          </FadeInUp>
                          <FadeInUp delay={0.6} duration={1.5}>
                            <Text my={5} fontSize={{ base: 'md', lg: 'lg' }}>
                              {card.text}
                            </Text>
                          </FadeInUp>
                          <FadeInUp delay={0.9} duration={1.5}>
                            <Button
                              as={HashLink}
                              _hover={{ background: 'white', color: 'blue.500' }}
                              transitionDuration='0.5s'
                              to={
                                fade_index === 1
                                  ? `/${shortUri}#eventInfo`
                                  : `/${shortUri}#departmentInfo`
                              }
                              smooth
                            >
                              <HStack>
                                <Text>
                                  {fade_index === 1 ? 'Thông tin Đại Lễ' : 'Thông tin các ban'}
                                </Text>
                                <FaArrowRight />
                              </HStack>
                            </Button>
                          </FadeInUp>
                        </Box>
                      )}
                    </Stack>
                  </Show>
                </Box>
              </Container>
            </Box>
          </Box>
        ))}
      </Slider>
      {isHomePage && (
        <Box
          pos='absolute'
          left={{ base: '0', md: 'unset' }}
          right={{ base: 0, md: '8%', xl: '10%', '2xl': '15%' }}
          transform={'translate(0%, -50%)'}
          top='50%'
          zIndex='1'
          p={'25px'}
          // mx={{ base: '10px', md: '80px' }}
          w={{ md: '45%', lg: '35%' }}
          maxW={{ md: '600px' }}
          bg='rgba(0,0,0,0.25)'
          _hover={{ background: 'rgba(0,0,0,0.8)' }}
          transitionDuration={'1s'}
          justifyContent={'center'}
          borderRadius='md'
          shadow='xl'
        >
          <Step1 previousStep={() => {}} nextStep={nextStep} />
        </Box>
      )}
    </Box>
  );
}
