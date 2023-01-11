import {
  AspectRatio,
  AspectRatioProps,
  Box,
  Button,
  Container,
  Heading,
  Input,
  InputProps,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useField } from 'formik';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import API from '~/apis/constants';
import useAxios from '~/hooks/useAxios';
import useCustomColorMode from '~/hooks/useColorMode';
import { getImageSrc } from '~/utils/functions';
import { Image as PrimeImage } from 'primereact/image';

type UploadFileProps = InputProps &
  AspectRatioProps & {
    dropLabel?: string;
    ratio?: number;
    onSelectFile?: (file: File) => void;
    file?: File;
    setOpenCrop?: (value: boolean) => void;
  };
type ImageResponse = {
  fileName: string;
  storedFileName: string;
};
type UploadResponse = { data?: ImageResponse[] };
export default function UploadFile(props: UploadFileProps) {
  const {
    name = '',
    placeholder,
    dropLabel,
    ratio,
    width,
    onSelectFile,
    file,
    setOpenCrop,
  } = props;
  const [label, setLabel] = useState(placeholder);
  const [data, setData] = useState<any>();
  const [field, _, helpers] = useField(name);
  const { primaryColor } = useCustomColorMode();
  const [imgSrc, setImgSrc] = useState(getImageSrc(field.value));
  const [innerFile, setInnerFile] = useState<File>();

  const handleChange = (e) => {
    if (!onSelectFile) {
      setInnerFile(e.target.files[0]);
    } else {
      onSelectFile?.(e.target.files[0]);
      setOpenCrop?.(true);
    }
  };
  const handleDrop = (e) => {
    if (!onSelectFile) {
      // setInnerFile(e.dataTransfer.files[0]);
    } else {
      onSelectFile?.(e.dataTransfer.files[0]);
      setOpenCrop?.(true);
    }
  };
  useEffect(() => {
    const formData = new FormData();
    if (file) {
      formData.append('files', file);
      setData(formData);
    }
    if (innerFile) {
      formData.append('files', innerFile);
      setData(formData);
    }
  }, [file, innerFile]);

  /* Upload file */
  const {
    cancel,
    data: uploadResponse,
    loaded: isUploaded,
  } = useAxios<UploadResponse>(
    {
      url: API.UPLOAD_PHOTO,
      method: 'post',
      data,
      params: {
        folder: 'dkdl_avatar',
      },
    },
    [data],
  );
  if (!(file || innerFile) && cancel) {
    cancel.cancel();
  }

  useEffect(() => {
    if (uploadResponse?.data) {
      const src = encodeURIComponent(uploadResponse.data[0]?.storedFileName);
      let directSrc;
      if (isUploaded) {
        if (file) {
          directSrc = URL.createObjectURL(file as Blob);
        }
        if (innerFile) {
          directSrc = URL.createObjectURL(innerFile as Blob);
        }
        setImgSrc(directSrc);
        helpers.setValue(src);
      }
    }
  }, [uploadResponse, isUploaded]);

  return (
    <Container my='2' centerContent>
      <AspectRatio width={width} ratio={ratio}>
        <Box
          borderColor='gray.300'
          borderStyle='dashed'
          borderWidth='2px'
          rounded='md'
          shadow='sm'
          role='group'
          transition='all 150ms ease-in-out'
          _hover={{
            shadow: 'md',
          }}
          as={motion.div}
          initial='rest'
          animate='rest'
          whileHover='hover'
        >
          <Box position='relative' height='100%' width='100%'>
            <Box
              position='absolute'
              top='0'
              left='0'
              height='100%'
              width='100%'
              display='flex'
              flexDirection='column'
            >
              <Stack
                height='100%'
                width='100%'
                display='flex'
                alignItems='center'
                justify='center'
                // spacing='4'
              >
                {field.value ? (
                  <Box position='relative'>
                    <PrimeImage preview src={imgSrc} />
                  </Box>
                ) : (
                  <Stack p='8' textAlign='center' spacing='1'>
                    <Heading fontSize={14} color={primaryColor} fontWeight='bold'>
                      {label}
                    </Heading>
                    <Text fontSize={12} fontWeight='light'>
                      hoặc bấm để chọn ảnh
                    </Text>
                  </Stack>
                )}
              </Stack>
            </Box>
            <Input
              cursor='pointer'
              type='file'
              height='100%'
              width='100%'
              position='absolute'
              top='0'
              left='0'
              opacity='0'
              aria-hidden='true'
              accept='image/*'
              onDragLeave={() => setLabel(placeholder)}
              onDragEnter={() => setLabel(dropLabel)}
              onDrop={handleDrop}
              onChange={handleChange}
              onClick={handleChange}
            />
          </Box>
        </Box>
      </AspectRatio>
    </Container>
  );
}

UploadFile.defaultProps = {
  placeholder: 'Kéo ảnh vào',
  dropLabel: 'Thả vào đây ạ',
  ratio: 3 / 4,
  width: '32',
} as UploadFileProps;
