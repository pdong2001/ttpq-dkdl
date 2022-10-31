import {
  Stack,
  Heading,
  FormControl,
  FormLabel,
  RadioGroup,
  HStack,
  Radio,
  Button,
  Box,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import FloatingLabel from '~/components/Form/FloatingLabel/FloatingLabel';
import useCustomColorMode from '~/hooks/useColorMode';
import { StepProps } from '..';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { REGEX_PHONE } from '~/utils/common';

const Step1 = (props: StepProps) => {
  const { nextStep } = props;
  const { bgColor, primaryColor, formTextColor } = useCustomColorMode();
  console.log('primary Color', primaryColor);
  const formik = useFormik({
    initialValues: {
      name: '',
      phone: '',
      citizenId: '',
      registerType: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Xin hãy nhập họ và tên'),
      phone: Yup.string()
        .required('Xin hãy nhập số điện thoại')
        .matches(REGEX_PHONE, 'Số điện thoại không hợp lệ'),
      citizenId: Yup.string().required('Xin hãy nhập số căn cước'),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <Stack
      bg={bgColor}
      rounded={'xl'}
      p={{ base: 4, sm: 6, md: 8 }}
      spacing={{ base: 8 }}
      maxW={{ lg: 'lg' }}
      mx={{ base: 10, md: 20 }}
    >
      <Stack spacing={4}>
        <Heading
          color={primaryColor}
          lineHeight={1.1}
          fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}
        >
          Đăng ký đại lễ
        </Heading>
        <Text color={'gray.500'} fontSize={{ base: 'sm', sm: 'md' }}>
          PL.2565 - DL.2022
        </Text>
      </Stack>
      <Box mt={10}>
        <form onSubmit={formik.handleSubmit}>
          <Stack spacing={4}>
            <FloatingLabel
              name='name'
              label='Họ và tên'
              color={formTextColor}
              isRequired
              onChange={formik.handleChange}
              value={formik.values.name}
              errorMessage={formik.errors.name}
            />
            <FloatingLabel
              name='phone'
              label='Số điện thoại'
              color={formTextColor}
              isRequired
              onChange={formik.handleChange}
              value={formik.values.phone}
              errorMessage={formik.errors.phone}
            />
            <FloatingLabel
              name='citizenId'
              label='Số căn cước / Hộ chiếu'
              color={formTextColor}
              isRequired
              onChange={formik.handleChange}
              value={formik.values.citizenId}
              errorMessage={formik.errors.citizenId}
            />
            <FormControl as='fieldset' border={1} isRequired>
              <FormLabel as='legend' color={formTextColor}>
                Hình thức đăng ký
              </FormLabel>
              <RadioGroup defaultValue='0' color={formTextColor}>
                <HStack spacing='24px'>
                  <Radio value='0'>Cá nhân</Radio>
                  <Radio value='1'>Nhóm</Radio>
                </HStack>
              </RadioGroup>
            </FormControl>
          </Stack>
          <Button fontFamily={'heading'} mt={8} w={'full'} onClick={nextStep}>
            Tiếp theo
          </Button>
        </form>
      </Box>
    </Stack>
  );
};

export default Step1;
