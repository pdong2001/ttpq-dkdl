import React, { useState, useRef, useEffect, ComponentProps } from 'react';

import ReactCrop, { centerCrop, makeAspectCrop, Crop, PixelCrop } from 'react-image-crop';
import { canvasPreview, dataURItoBlob } from '~/utils/functions';
import { useDebounceEffect } from '~/hooks/useDebounceEffect';

import 'react-image-crop/dist/ReactCrop.css';
import { Dialog } from 'primereact/dialog';
import {
  Box,
  Button,
  Center,
  SimpleGrid,
  Slider,
  SliderMark,
  SliderThumb,
  SliderTrack,
} from '@chakra-ui/react';
import { BiRotateRight } from 'react-icons/bi';
import UploadFile from '../UploadFile';
import { MdGraphicEq } from 'react-icons/md';

// This is to demonstate how to make and center a % aspect crop
// which is a bit trickier so we use some helper functions.
function centerAspectCrop(mediaWidth: number, mediaHeight: number, aspect: number) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight,
    ),
    mediaWidth,
    mediaHeight,
  );
}
type Props = {
  aspect?: number;
} & ComponentProps<typeof UploadFile>;

export default function CropImage(props: Props) {
  const { aspect = 3 / 4, width, name } = props;
  const [cropFile, setCropFile] = useState<File>();
  const [confirmCropFile, setConfirmCropFile] = useState<File>();

  const [imgSrc, setImgSrc] = useState('');
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [openCrop, setOpenCrop] = useState(false);

  function onSelectFile(file: File) {
    if (file) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setImgSrc(reader.result?.toString() || '');
        setOpenCrop(true);
      });
      reader.readAsDataURL(file);
    }
  }

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    if (aspect) {
      const { width, height } = e.currentTarget;
      setCrop(centerAspectCrop(width, height, aspect));
    }
  }

  useDebounceEffect(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        // We use canvasPreview as it's much faster than imgPreview.
        canvasPreview(imgRef.current, previewCanvasRef.current, completedCrop, scale, rotate);
      }
    },
    100,
    [completedCrop, scale, rotate],
  );

  useEffect(() => {
    if (imgSrc && previewCanvasRef.current?.toDataURL?.()) {
      setCropFile(dataURItoBlob(previewCanvasRef.current?.toDataURL()) as File);
    }
  }, [previewCanvasRef.current, completedCrop]);

  return (
    <>
      {/* <input type='file' accept='image/*' onChange={onSelectFile} /> */}
      <UploadFile
        ratio={aspect}
        width={width}
        name={name}
        file={confirmCropFile}
        onSelectFile={onSelectFile}
        setOpenCrop={setOpenCrop}
      />
      <Dialog
        appendTo={document.body}
        header='Cắt ảnh'
        visible={openCrop}
        position={'center'}
        modal
        style={{ width: '80vw' }}
        breakpoints={{ '576px': '100vw' }}
        onHide={() => {
          setOpenCrop(false);
          setImgSrc('');
          setRotate(0);
        }}
        draggable={false}
        resizable={false}
        closeOnEscape
        closable
        blockScroll
      >
        <Box py={10}>
          <Box>
            <SimpleGrid columns={{ base: 1, lg: 2 }} gap={10} my={2}>
              <Button
                leftIcon={<BiRotateRight />}
                id='rotate-input'
                disabled={!imgSrc}
                onClick={(e) => setRotate(rotate + 90)}
              >
                Xoay
              </Button>
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
            </SimpleGrid>
          </Box>
          <SimpleGrid columns={{ base: 1, lg: 2 }} gap={10}>
            <Box>
              {!!imgSrc && (
                <ReactCrop
                  crop={crop}
                  onChange={(_, percentCrop) => setCrop(percentCrop)}
                  onComplete={(c) => setCompletedCrop(c)}
                  aspect={aspect}
                >
                  <img
                    ref={imgRef}
                    alt='Crop me'
                    src={imgSrc}
                    style={{
                      transform: `scale(${scale}) rotate(${rotate}deg)`,
                      objectFit: 'contain',
                      maxHeight: '50vh',
                    }}
                    onLoad={onImageLoad}
                  />
                </ReactCrop>
              )}
            </Box>
            {!!completedCrop && (
              <canvas
                ref={previewCanvasRef}
                style={{
                  border: '1px solid black',
                  objectFit: 'contain',
                  width: completedCrop.width,
                  height: completedCrop.height,
                }}
              />
            )}
          </SimpleGrid>

          <Center py={5}>
            <Button
              onClick={() => {
                setConfirmCropFile(cropFile);
                setOpenCrop(false);
              }}
            >
              Cắt ảnh
            </Button>
          </Center>
        </Box>
      </Dialog>
    </>
  );
}
