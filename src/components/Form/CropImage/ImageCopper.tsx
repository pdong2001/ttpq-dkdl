import { useState, ComponentProps } from 'react';

import 'react-image-crop/dist/ReactCrop.css';
import { Dialog } from 'primereact/dialog';
import { Box, SimpleGrid } from '@chakra-ui/react';
import UploadFile from '../UploadFile';
import ImgCropper from './Copper';

type Props = {
  aspect?: number;
  fileName: string;
} & ComponentProps<typeof UploadFile>;

export default function ImageCropper(props: Props) {
  const { aspect = 3 / 4, width, name, fileName } = props;
  const [confirmCropFile, setConfirmCropFile] = useState<File>();

  const [imgSrc, setImgSrc] = useState('');
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [openCrop, setOpenCrop] = useState(false);
  // const [file, setFile] = useState<File>();

  function onSelectFile(file: File) {
    if (file) {
      // setFile(file);
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setImgSrc(reader.result?.toString() || '');
        setOpenCrop(true);
      });
      reader.readAsDataURL(file);
    }
  }

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
          <SimpleGrid columns={{ base: 1, lg: 2 }} gap={10}>
            <Box>
              {!!imgSrc && (
                <ImgCropper
                  aspect={aspect}
                  src={imgSrc}
                  getCroppedFile={(c) => {
                    fetch(c)
                      .then((res) => res.blob())
                      .then((blob) => {
                        const file = new File([blob], fileName + '.jpg' || 'fileName.jpeg', {
                          type: 'image/jpeg',
                          lastModified: new Date().getTime(),
                        });
                        setConfirmCropFile(file);
                        setOpenCrop(false);
                      });
                  }}
                />
              )}
            </Box>
          </SimpleGrid>

          {/* <Center py={5}>
            <Button
              onClick={() => {
                setConfirmCropFile(cropFile);
                setOpenCrop(false);
              }}
            >
              Cắt ảnh
            </Button>
          </Center> */}
        </Box>
      </Dialog>
    </>
  );
}
