import React, { useState, ComponentProps, useCallback } from 'react';

import { centerCrop, makeAspectCrop, PixelCrop } from 'react-image-crop';

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
import UploadFile from '../UploadFile';
import { MdGraphicEq } from 'react-icons/md';
import Cropper from 'react-easy-crop';
import getCroppedImg from '~/utils/functions/cropImage';

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
  const [file, setFile] = useState<File>();
  const [confirmCropFile, setConfirmCropFile] = useState<File>();

  const [imgSrc, setImgSrc] = useState('');
  const [openCrop, setOpenCrop] = useState(false);

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<PixelCrop>();
  // const [croppedImage, setCroppedImage] = useState<any>(null);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(imgSrc, croppedAreaPixels, rotation);
      console.log('donee', { croppedImage });
      // setCroppedImage(croppedImage);
      const blob = await (await fetch(croppedImage as URL)).blob();
      const file = new File([blob], 'fileName.jpeg', {
        type: 'image/jpeg',
        lastModified: new Date(),
      });
      debugger;
      setCropFile(file);
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels, rotation]);

  function onSelectFile(file: File) {
    if (file) {
      setFile(file);
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setImgSrc(reader.result?.toString() || '');
        setOpenCrop(true);
      });
      reader.readAsDataURL(file);
    }
  }

  // function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
  //   if (aspect) {
  //     const { width, height } = e.currentTarget;
  //     setCrop(centerAspectCrop(width, height, aspect));
  //   }
  // }

  // useDebounceEffect(
  //   async () => {
  //     if (
  //       completedCrop?.width &&
  //       completedCrop?.height &&
  //       imgRef.current &&
  //       previewCanvasRef.current
  //     ) {
  //       // We use canvasPreview as it's much faster than imgPreview.
  //       canvasPreview(imgRef.current, previewCanvasRef.current, croppedAreaPixels, zoom, rotation);
  //     }
  //   },
  //   100,
  //   [completedCrop, scale, rotate],
  // );

  // useEffect(() => {
  //   if (imgSrc && previewCanvasRef.current?.toDataURL?.()) {
  //     const cropFile = dataURLtoFile(
  //       previewCanvasRef.current?.toDataURL(),
  //       file?.name || 'croppedImage.png',
  //     );
  //     // const b: any = blob;
  //     // b.lastModifiedDate = new Date();
  //     // b.name = 'newImage.png';
  //     // setCropFile(b as File);

  //     // const dataUrl = previewCanvasRef.current?.toDataURL();
  //     // const buffer = Buffer.from(dataUrl.slice(dataUrl.indexOf('base64,') + 7), 'base64');
  //     // let type = 'image/png';
  //     // let name = 'newimage.png';
  //     // if (file) {
  //     //   type = file.type;
  //     //   name = file.name;
  //     // }
  //     // const blob = new Blob([buffer], {
  //     //   type: type,
  //     // });
  //     // const b: any = blob;
  //     // b.lastModifiedDate = new Date();
  //     // b.name = name;
  //     setCropFile(cropFile);
  //   }
  // }, [previewCanvasRef.current, completedCrop]);

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
          setRotation(0);
        }}
        draggable={false}
        resizable={false}
        closeOnEscape
        closable
        blockScroll
        maximizable
      >
        <Box py={10}>
          <Box>
            <SimpleGrid columns={{ base: 1 }} gap={10} my={2}>
              {/* <Button
                leftIcon={<BiRotateRight />}
                id='rotate-input'
                disabled={!imgSrc}
                onClick={(e) => setRotation(rotation + 90)}
              >
                Xoay
              </Button> */}
              <Slider
                defaultValue={rotation}
                min={0}
                max={360}
                step={1}
                onChange={(value) => setRotation(value)}
              >
                <SliderMark
                  value={rotation}
                  textAlign='center'
                  bg='blue.500'
                  color='white'
                  mt='-10'
                  ml='-5'
                  rounded='md'
                  p={1}
                  w={32}
                >
                  {`Xoay: ${rotation}`}
                </SliderMark>
                <SliderTrack bg='blue.500'>
                  <Box position='relative' right={10} />
                </SliderTrack>
                <SliderThumb boxSize={6}>
                  <Box color='tomato' as={MdGraphicEq} />
                </SliderThumb>
              </Slider>
              <Slider
                defaultValue={zoom}
                min={0.5}
                max={2}
                step={0.01}
                onChange={(value) => setZoom(value)}
              >
                <SliderMark
                  value={zoom}
                  textAlign='center'
                  bg='blue.500'
                  color='white'
                  mt='-10'
                  ml='-5'
                  rounded='md'
                  p={1}
                  w={32}
                >
                  {`Zoom: ${zoom.toFixed(2)}`}
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
          <SimpleGrid columns={{ base: 1 }}>
            <Box position='relative' width='100%' height={['200px', '400px']} background='#333'>
              {!!imgSrc && (
                <Cropper
                  image={imgSrc}
                  crop={crop}
                  rotation={rotation}
                  zoom={zoom}
                  showGrid={false}
                  aspect={aspect}
                  onCropChange={setCrop}
                  onRotationChange={setRotation}
                  onCropComplete={onCropComplete}
                  onZoomChange={setZoom}
                  // onCropAreaChange={(croppedArea) => {
                  //   setCroppedArea(croppedArea);
                  // }}
                />
              )}
            </Box>
          </SimpleGrid>

          <Center py={5}>
            <Button
              onClick={() => {
                setConfirmCropFile(cropFile);
                setOpenCrop(false);
                showCroppedImage();
                debugger;
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
