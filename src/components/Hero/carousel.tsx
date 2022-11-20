import React, { useEffect, useState } from 'react';
import {
  Box,
  IconButton,
  useBreakpointValue,
  Stack,
  Heading,
  Text,
  Flex,
  Button,
  createIcon,
  HStack,
  Show,
  Container,
} from '@chakra-ui/react';
// Here we have used react-icons package for the icons
import { MdOutlineKeyboardArrowRight, MdOutlineKeyboardArrowLeft } from 'react-icons/md';
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

const PlayIcon = createIcon({
  displayName: 'PlayIcon',
  viewBox: '0 0 58 58',
  d: 'M28.9999 0.562988C13.3196 0.562988 0.562378 13.3202 0.562378 29.0005C0.562378 44.6808 13.3196 57.438 28.9999 57.438C44.6801 57.438 57.4374 44.6808 57.4374 29.0005C57.4374 13.3202 44.6801 0.562988 28.9999 0.562988ZM39.2223 30.272L23.5749 39.7247C23.3506 39.8591 23.0946 39.9314 22.8332 39.9342C22.5717 39.9369 22.3142 39.8701 22.0871 39.7406C21.86 39.611 21.6715 39.4234 21.5408 39.1969C21.4102 38.9705 21.3421 38.7133 21.3436 38.4519V19.5491C21.3421 19.2877 21.4102 19.0305 21.5408 18.8041C21.6715 18.5776 21.86 18.3899 22.0871 18.2604C22.3142 18.1308 22.5717 18.064 22.8332 18.0668C23.0946 18.0696 23.3506 18.1419 23.5749 18.2763L39.2223 27.729C39.4404 27.8619 39.6207 28.0486 39.7458 28.2713C39.8709 28.494 39.9366 28.7451 39.9366 29.0005C39.9366 29.2559 39.8709 29.507 39.7458 29.7297C39.6207 29.9523 39.4404 30.1391 39.2223 30.272Z',
});

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
  const top = useBreakpointValue({ base: '95%', lg: '50%' });
  const side = useBreakpointValue({ base: '0', lg: '40px' });

  // Settings for the slider
  const settings = {
    dots: false,
    arrows: true,
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
      {/* CSS files for react-slick */}
      <link
        rel='stylesheet'
        type='text/css'
        charSet='UTF-8'
        href='https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css'
      />
      <link
        rel='stylesheet'
        type='text/css'
        href='https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css'
      />
      {/* Left Icon */}
      <IconButton
        color='white'
        _hover={{
          bg: 'yellow.400',
        }}
        aria-label='left-arrow'
        variant='ghost'
        position='absolute'
        left={side}
        top={top}
        transform={'translate(0%, -50%)'}
        zIndex={2}
        onClick={() => slider?.slickPrev()}
      >
        <MdOutlineKeyboardArrowLeft size='40px' />
      </IconButton>
      {/* Right Icon */}
      <IconButton
        color='white'
        _hover={{
          bg: 'yellow.400',
        }}
        aria-label='right-arrow'
        variant='ghost'
        position='absolute'
        right={side}
        top={top}
        transform={'translate(0%, -50%)'}
        zIndex={2}
        onClick={() => slider?.slickNext()}
      >
        <MdOutlineKeyboardArrowRight size='40px' />
      </IconButton>
      {/* Slider */}
      <Slider {...settings} ref={(slider) => setSlider(slider)}>
        {cards.map((card, index) => (
          <Box
            key={index}
            backgroundImage={`url(${card.image})`}
            backgroundPosition={{ base: 'center', md: 'bottom' }}
            backgroundRepeat='no-repeat'
            backgroundSize='cover'
            transitionDuration={'2s'}
          >
            <Box bg='rgba(0,0,0, 0.45)'>
              <Container maxW='6xl' position='relative' px={[3, 5, 16, 0]}>
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
          right={0}
          transform={'translate(0%, -50%)'}
          top='50%'
          zIndex='1'
          p={'25px'}
          mx={{ base: '10px', md: '80px' }}
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
