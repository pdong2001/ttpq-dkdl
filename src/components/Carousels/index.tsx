import {
  Box,
  Image,
  IconButton,
  useBreakpointValue,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';
import Slider from 'react-slick';

import './style.css'
type Props = {
  images: any;
  styles: Object;
  settings: Object;
};

const Carousels = ({ images, styles, settings = {} }: Props) => {
  const [initSlide, setInitSlide] = useState(0);

  const settingsDefault = {
    dots: true,
    arrows: false,
    fade: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: initSlide,
    ...settings,
  };

  const [slider, setSlider] = useState<Slider | null>(null);
  // buttons as the screen size changes
  const top = useBreakpointValue({ base: '50%', md: '50%' });
  const side = useBreakpointValue({ base: '50%', md: '10px' });

  useEffect(() => {
    setTimeout(() => {
      setInitSlide(2);
    }, 1000);
  })

  return (
    <>
      <Box position='relative' style={styles} className='carousel'>
        {/* CSS files for react-slick */}
        <link
          rel='stylesheet'
          type='text/css'
          href='https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css'
        />
        <link
          rel='stylesheet'
          type='text/css'
          href='https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css'
        />
        {/* Left Icon */}
        <IconButton
          aria-label='left-arrow'
          variant='ghost'
          position='absolute'
          left={side}
          top={top}
          transform={'translate(0%, -50%)'}
          zIndex={2}
          onClick={() => slider?.slickPrev()}
        >
          <BiLeftArrowAlt size='40px' />
        </IconButton>
        {/* Right Icon */}
        <IconButton
          aria-label='right-arrow'
          variant='ghost'
          position='absolute'
          right={side}
          top={top}
          transform={'translate(0%, -50%)'}
          zIndex={2}
          onClick={() => slider?.slickNext()}
        >
          <BiRightArrowAlt size='40px' />
        </IconButton>
        <Slider
          {...settingsDefault}
          ref={(slider: Slider) => {
            setSlider(slider);
          }}
        >
          {images.map((image, index) => (
            <Image
              key={index}
              alt={'feature image'}
              height={'100vh'}
              src={image}
              objectFit={'cover'}
            />
          ))}
        </Slider>
      </Box>
    </>
  );
};


export default Carousels;
