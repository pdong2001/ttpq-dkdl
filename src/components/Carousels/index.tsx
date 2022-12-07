import { Box, Image, useBreakpointValue, Flex } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';
import Slider from 'react-slick';

import './style.css';
type Props = {
  images: any;
  styles?: Object;
  settings?: Object;
  imageProps?: Object;
};

const Carousels = ({ images, styles, settings = {}, imageProps = { height: '100%' } }: Props) => {
  const [initSlide, setInitSlide] = useState(0);

  const settingsDefault = {
    arrows: false,
    fade: true,
    // infinite: true,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: initSlide,
    ...settings,
  };

  const [slider, setSlider] = useState<Slider | null>(null);
  // buttons as the screen size changes
  const top = useBreakpointValue({ base: '50%', lg: '50%' });
  const side = useBreakpointValue({ base: '5%', lg: '5%' });

  useEffect(() => {
    setTimeout(() => {
      setInitSlide(2);
    }, 1000);
  });

  return (
    <>
      <Box
        position={'relative'}
        height={'100%'}
        width={'full'}
        overflow={'hidden'}
        style={styles}
        className='carousel'
        _hover={{
          bg: 'whiteAlpha.300',
        }}
      >
        {/* Left Icon */}
        <Box
          as={Flex}
          alignItems='center'
          justifyContent='center'
          aria-label='left-arrow'
          // variant='ghost'
          color='white'
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
          _hover={{
            bg: 'whiteAlpha.300',
          }}
        >
          <BiLeftArrowAlt size='30px' />
        </Box>
        {/* Right Icon */}
        <Box
          aria-label='right-arrow'
          as={Flex}
          alignItems='center'
          justifyContent='center'
          // variant='ghost'
          color='white'
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
          _hover={{
            bg: 'whiteAlpha.300',
          }}
        >
          <BiRightArrowAlt size='30px' />
        </Box>
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
              // height='100%'
              src={image}
              objectFit={'cover'}
              {...imageProps}
              // width={'100vh'}
            />
          ))}
        </Slider>
      </Box>
    </>
  );
};

export default Carousels;
