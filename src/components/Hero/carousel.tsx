import React, { useContext, useEffect, useState } from 'react';
import { Box, useBreakpointValue, Stack, Heading, Text, Show, Container } from '@chakra-ui/react';
// And react-slick as our Carousel Lib
import Slider from 'react-slick';

import cover00 from '~/assets/cover-hero/cover-00.jpg';
import cover01 from '~/assets/cover-ctn/cover-1.jpg';
// import cover02 from '~/assets/cover-ctn/cover-2.jpg';
import cover03 from '~/assets/cover-ctn/cover-3.jpg';
// import cover04 from '~/assets/cover-ctn/cover-4.jpg';
import cover05 from '~/assets/cover-ctn/cover-5.jpg';
import cover06 from '~/assets/event-info/dai-le-10.jpg';
import cover07 from '~/assets/event-info/dai-le-20.jpg';

import FadeInUp from '~/components/Animation/FadeInUp';
import Step1 from '~/pages/MultiStepRegister/RegisterSteps/Step1';
import { useHistory, useRouteMatch, useParams } from 'react-router-dom';
import { HOME_WITH_SHORT_URI, ADD_NEW_REGISTER_PATH } from '~/routes';
import { formatUrl } from '~/utils/functions';
import { useAppSelector } from '~/hooks/reduxHook';
import useCustomColorMode from '~/hooks/useColorMode';
import { AuthContext } from '~/providers/auth';
export default function CaptionCarousel() {
  const history = useHistory();
  const { path } = useRouteMatch();
  const { shortUri = '' } = useParams<any>();
  // const dispatch = useAppDispatch();
  const [registerAvailable, setRegisterAvailable] = useState(true);
  // const messageService = useContext(MessageContext);
  const pageConfig = useAppSelector((state) => state.registerPage.data);
  const { member } = useContext(AuthContext);
  const { register } = member || {};
  useEffect(() => {
    if (pageConfig.eventId && shortUri && !register) {
      setRegisterAvailable(true);
    } else {
      setRegisterAvailable(false);
    }
  }, [pageConfig, shortUri]);

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
      image: cover00,
    },
    {
      title: '',
      text: '',
      image: cover06,
    },
    {
      title: '',
      text: '',
      image: cover03,
    },
    {
      title: '',
      text: '',
      image: cover07,
    },
    {
      title: '',
      text: '',
      image: cover05,
    },
  ];
  const { bgColor } = useCustomColorMode();
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
          maxW={{ md: '450px' }}
          bg={{ base: bgColor, md: 'rgba(255,255,255,.85)' }}
          transitionDuration={'1s'}
          justifyContent={'center'}
          borderRadius='md'
          shadow='5xl'
          zIndex='2'
          _hover={{ background: 'rgba(255, 255, 255, 1)' }}
        >
          <Step1 previousStep={() => undefined} nextStep={nextStep} />
        </Box>
      )}
    </Box>
  );
}
