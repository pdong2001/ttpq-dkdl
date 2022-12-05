import React, { useContext, useEffect, useState } from 'react';
import { Box, useBreakpointValue, Stack, Heading, Text, Show, Container } from '@chakra-ui/react';
// And react-slick as our Carousel Lib
import Slider from 'react-slick';

import cover01 from '~/assets/cover-slide/cover-1.jpg';
import cover02 from '~/assets/cover-slide/cover-2.jpg';
import cover03 from '~/assets/cover-slide/cover-3.jpg';
import cover04 from '~/assets/cover-slide/cover-4.jpg';
import cover05 from '~/assets/cover-slide/cover-5.jpg';

import FadeInUp from '~/components/Animation/FadeInUp';
import Step1 from '~/pages/MultiStepRegister/RegisterSteps/Step1';
import { useHistory, useRouteMatch, useParams } from 'react-router-dom';
import { HOME_WITH_SHORT_URI, ADD_NEW_REGISTER_PATH } from '~/routes';
import { formatUrl } from '~/utils/functions';
import { useAppDispatch } from '~/hooks/reduxHook';
import API from '~/apis/constants';
import { getRegisterPage } from '~/slices/registerPage';
import { unwrapResult } from '@reduxjs/toolkit';
import { MessageContext } from '~/providers/message';
export default function CaptionCarousel() {
  const history = useHistory();
  const { path } = useRouteMatch();
  const { shortUri = '' } = useParams<any>();
  const dispatch = useAppDispatch();
  const [registerAvailable, setRegisterAvailable] = useState(true);
  const messageService = useContext(MessageContext);

  useEffect(() => {
    if (!shortUri) {
      setRegisterAvailable(false);
    }
    if (shortUri) {
      dispatch(
        getRegisterPage({
          method: 'get',
          url: formatUrl(API.GET_REGISTER_PAGE, { shortUri }),
        }),
      )
        .then(unwrapResult)
        .then(({ data }) => {
          const { start, end } = data;
          console.log(start, end);

          const today = new Date();
          const isTimeup = new Date(start) > today || today > new Date(end);
          if (isTimeup) {
            setRegisterAvailable(false);
            messageService.add({ description: 'Trang đăng ký đã hết hạn', status: 'warning' });
          }
        })
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
  const side = useBreakpointValue({ base: '10px', lg: '20px', '2xl': '8%' });

  // Settings for the slider
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    fade: true,
    cssEase: 'linear',

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
      title: '',
      text: '',
      image: cover01,
    },
    {
      title: '',
      text: '',
      image: cover02,
    },
    {
      title: '',
      text: '',
      image: cover03,
    },
    {
      title: '',
      text: '',
      image: cover04,
    },
    {
      title: '',
      text: '',
      image: cover05,
    },
  ];

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
        borderColor='blue.200'
        display={{ base: 'none', md: 'block' }}
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
        borderColor='blue.200'
        display={{ base: 'none', md: 'block' }}
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
            <Box>
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
      {registerAvailable && (
        <Box
          pos='absolute'
          left={{ base: '0', md: 'unset' }}
          right={{ base: 0, md: '8%', xl: '10%', '2xl': '15%' }}
          transform={{ base: 'translate(0%, -50%)' }}
          top={{ base: '50%' }}
          p={'25px'}
          mx={{ base: 3, md: 'unset' }}
          w={{ md: '45%', lg: '35%' }}
          maxW={{ md: '600px' }}
          bg='gray.900'
          transitionDuration={'1s'}
          justifyContent={'center'}
          borderRadius='md'
          shadow='5xl'
          zIndex='2'
          opacity={0.95}
          _hover={{ opacity: 1 }}
        >
          <Step1 previousStep={() => undefined} nextStep={nextStep} />
        </Box>
      )}
    </Box>
  );
}
