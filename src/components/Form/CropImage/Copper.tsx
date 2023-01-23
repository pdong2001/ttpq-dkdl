import { useEffect, useRef, useState } from 'react';
import Cropper, { ReactCropperElement } from 'react-cropper';

import 'cropperjs/dist/cropper.css';
import {
  Skeleton,
  Button,
  Box,
  Slider,
  SliderMark,
  SliderTrack,
  SliderThumb,
  HStack,
  Stack,
  Flex,
} from '@chakra-ui/react';
import { MdGraphicEq } from 'react-icons/md';

type Props = { src: string; aspect: number; getCroppedFile: (data: string) => void };

export default function ImgCropper({ src, getCroppedFile, aspect }: Props) {
  const cropperRef = useRef<ReactCropperElement>(null);
  const [loading, setLoading] = useState(true);

  const handleClick = () => {
    const imageElement = cropperRef?.current;
    const cropper = imageElement?.cropper;
    if (cropper) {
      const img = cropper.getCroppedCanvas().toDataURL();
      getCroppedFile(img);
    }
  };

  const [rotate, setRotate] = useState(0);
  useEffect(() => {
    const imageElement = cropperRef?.current;
    const cropper = imageElement?.cropper;
    if (cropper) {
      cropper.rotateTo(rotate);
    }
  }, [rotate]);

  const [scale, setScale] = useState(1);
  useEffect(() => {
    const imageElement = cropperRef?.current;
    const cropper = imageElement?.cropper;
    if (cropper) {
      cropper.scale(scale);
    }
  }, [scale]);

  return (
    <>
      {loading && <Skeleton variant='rectangular' width={'100%'} height={400} />}

      <Stack gap={5}>
        <Slider
          defaultValue={rotate}
          min={-180}
          max={180}
          step={1}
          onChange={(value) => setRotate(value)}
        >
          <SliderMark
            value={rotate}
            textAlign='center'
            bg='blue.500'
            color='white'
            mt='-10'
            ml='-5'
            rounded='md'
            p={1}
            w={32}
          >
            {`Xoay: ${rotate} độ`}
          </SliderMark>
          <SliderTrack bg='blue.500'>
            <Box position='relative' right={10} />
          </SliderTrack>
          <SliderThumb boxSize={6}>
            <Box color='tomato' as={MdGraphicEq} />
          </SliderThumb>
        </Slider>

        <Slider
          defaultValue={scale}
          min={0.5}
          max={2}
          step={0.01}
          onChange={(value) => setScale(value)}
        >
          <SliderMark
            value={scale}
            textAlign='center'
            bg='blue.500'
            color='white'
            mt='-10'
            ml='-5'
            rounded='md'
            p={1}
            w={32}
          >
            {`Zoom: ${scale}`}
          </SliderMark>
          <SliderTrack bg='blue.500'>
            <Box position='relative' right={10} />
          </SliderTrack>
          <SliderThumb boxSize={6}>
            <Box color='tomato' as={MdGraphicEq} />
          </SliderThumb>
        </Slider>
      </Stack>
      <HStack gap={2} mb={3}>
        <Button
          onClick={() => {
            setScale(1);
            setRotate(0);
          }}
          colorScheme='teal'
        >
          Reset
        </Button>

        <Button onClick={handleClick} colorScheme='green'>
          Cắt
        </Button>
      </HStack>

      <Cropper
        src={src}
        aspectRatio={aspect}
        style={{ height: 400, width: '100%' }}
        // Cropper.js options
        initialAspectRatio={aspect}
        guides={false}
        ready={() => {
          setLoading(false);
        }}
        ref={cropperRef}
      />
    </>
  );
}
