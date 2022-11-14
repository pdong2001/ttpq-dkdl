import {
  AspectRatio,
  Box,
  BoxProps,
  Container,
  forwardRef,
  Heading,
  Image,
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
import { formatUrl } from '~/utils/functions';

/*const first = {
  rest: {
    rotate: '-15deg',
    scale: 0.95,
    x: '-50%',
    filter: 'grayscale(80%)',
    transition: {
      duration: 0.5,
      type: 'tween',
      ease: 'easeIn',
    },
  },
  hover: {
    x: '-70%',
    scale: 1.1,
    rotate: '-20deg',
    filter: 'grayscale(0%)',
    transition: {
      duration: 0.4,
      type: 'tween',
      ease: 'easeOut',
    },
  },
};*/

/*const second = {
  rest: {
    rotate: '15deg',
    scale: 0.95,
    x: '50%',
    filter: 'grayscale(80%)',
    transition: {
      duration: 0.5,
      type: 'tween',
      ease: 'easeIn',
    },
  },
  hover: {
    x: '70%',
    scale: 1.1,
    rotate: '20deg',
    filter: 'grayscale(0%)',
    transition: {
      duration: 0.4,
      type: 'tween',
      ease: 'easeOut',
    },
  },
};*/

const third = {
  rest: {
    scale: 1.1,
    filter: 'grayscale(80%)',
    transition: {
      duration: 0.5,
      type: 'tween',
      ease: 'easeIn',
    },
  },
  hover: {
    scale: 1.3,
    filter: 'grayscale(0%)',
    transition: {
      duration: 0.4,
      type: 'tween',
      ease: 'easeOut',
    },
  },
};

const PreviewImage = forwardRef<BoxProps, typeof Box>((props, ref) => {
  return (
    <Box
      bg='white'
      top='0'
      height='100%'
      width='100%'
      position='absolute'
      borderWidth='1px'
      borderStyle='solid'
      rounded='sm'
      borderColor='gray.400'
      as={motion.div}
      backgroundSize='cover'
      backgroundRepeat='no-repeat'
      backgroundPosition='center'
      backgroundImage={`url("https://image.shutterstock.com/image-photo/paella-traditional-classic-spanish-seafood-600w-1662253543.jpg")`}
      {...props}
      ref={ref}
    />
  );
});
type UploadFileProps = InputProps & { dropLabel?: string };
export default function UploadFile(props: UploadFileProps) {
  const { name, placeholder, dropLabel } = props;
  const [label, setLabel] = useState(placeholder);
  const [file, setFile] = useState<File | undefined>();
  const [data, setData] = useState<any>();
  const [field, _, helpers] = useField(name);

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };
  const handleDrop = (e) => {
    setFile(e.dataTransfer.files[0]);
  };
  useEffect(() => {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      setData(formData);
    }
  }, [file]);

  /* Upload file */
  const { cancel, data: uploadResponse } = useAxios(
    {
      url: API.UPLOAD_FILE,
      method: 'post',
      data,
    },
    [data],
  );
  if (!file && cancel) {
    cancel.cancel();
  }

  useEffect(() => {
    if (uploadResponse?.data) {
      helpers.setValue(formatUrl(API.GET_FILE, { id: uploadResponse.data }));
    }
  }, [uploadResponse]);

  return (
    <Container my='2' centerContent>
      <AspectRatio width='64' ratio={1}>
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
                    <Image src={field.value} />
                  </Box>
                ) : (
                  <Stack p='8' textAlign='center' spacing='1'>
                    <Heading fontSize='lg' color='gray.700' fontWeight='bold'>
                      {label}
                    </Heading>
                    <Text fontWeight='light'>hoặc click để chọn ảnh</Text>
                  </Stack>
                )}
              </Stack>
            </Box>
            <Input
              {...props}
              // @ts-ignore
              // value={file}
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
            />
          </Box>
        </Box>
      </AspectRatio>
    </Container>
  );
}

UploadFile.defaultProps = {
  placeholder: 'Kéo ảnh vào hoặc bấm để chọn ảnh',
  dropLabel: 'Thả vào đây ạ',
} as UploadFileProps;
