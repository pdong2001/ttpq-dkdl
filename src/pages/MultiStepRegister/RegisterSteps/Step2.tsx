import {
  Stack,
  Heading,
  FormControl,
  FormLabel,
  HStack,
  Radio,
  Button,
  Box,
  Text,
} from '@chakra-ui/react';
import { Form, FormikProvider, useFormik } from 'formik';
import FloatingLabel from '~/components/Form/FloatingLabel/FloatingLabel';
import useCustomColorMode from '~/hooks/useColorMode';
import { StepProps } from '..';
import * as Yup from 'yup';
import Select from '~/components/Form/CustomSelect';
import Address from '~/components/Form/Address';
import Radios from '~/components/Form/Radios';

const monthOfBirth = [
  { id: '1', name: '01' },
  { id: '2', name: '02' },
  { id: '3', name: '03' },
  { id: '4', name: '04' },
  { id: '5', name: '05' },
  { id: '6', name: '06' },
  { id: '7', name: '07' },
  { id: '8', name: '08' },
  { id: '9', name: '09' },
  { id: '10', name: '10' },
  { id: '11', name: '11' },
  { id: '12', name: '12' },
];

// nơi sinh hoạt
const youthAssociationList = [
  {
    id: 1,
    name: 'CTN Hà Nội',
    ParentId: 0,
    Status: 1,
    Sort: 0,
    Type: 2,
    ProvinceId: 2,
    DistrictIds: null,
    PerDelId: 0,
    DeleteReason: null,
  },
  {
    id: 2,
    name: 'Tổ 1',
    ParentId: 1398,
    Status: 1,
    Sort: 0,
    Type: 1,
    ProvinceId: 2,
    DistrictIds: '1,4',
    PerDelId: 0,
    DeleteReason: null,
  },
];
// tổ
const groupOfYouthAssociationList = [
  {
    id: 1,
    name: 'CTN Hà Nội',
    ParentId: 0,
    Status: 1,
    Sort: 0,
    Type: 2,
    ProvinceId: 2,
    DistrictIds: null,
    PerDelId: 0,
    DeleteReason: null,
  },
  {
    id: 1403,
    name: 'Thứ 2 Chùa Đồng',
    ParentId: 1,
    Status: 1,
    Sort: 20,
    Type: 1,
    ProvinceId: 0,
    DistrictIds: null,
    PerDelId: 0,
    DeleteReason: null,
  },
];

const Step2 = (props: StepProps) => {
  const { nextStep } = props;
  const { bgColor, primaryColor, formTextColor } = useCustomColorMode();
  const name = 'Nguyen Van A';
  const phone = '0909990909';
  const citizenId = '1234567890';

  const formik = useFormik({
    initialValues: {
      roleInGroup: '2',
      citizenIdOfLeader: '',
      buddhistName: '',
      dayOfBirth: '',
      monthOfBirth: '',
      yearOfBirth: '',
      email: '',
      permanentAddressProvince: '',
      permanentAddressDistrict: '',
      permanentAddressVillage: '',
      temporaryAddressProvince: '',
      temporaryAddressDistrict: '',
      temporaryAddressVillage: '',
      youthAssociationList: '',
      groupOfYouthAssociation: '',
    },
    validationSchema: Yup.object({
      citizenIdOfLeader: Yup.string().required('Xin hãy nhập CCCD / CMND của trưởng nhóm'),
      permanentAddressProvince: Yup.string().required('Tỉnh là bắt buộc'),
      permanentAddressDistrict: Yup.string().required('Huyện là buộc'),
      permanentAddressVillage: Yup.string().required('Xã là bắt buộc'),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      nextStep();
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
          Cập nhật thông tin
        </Heading>
        <Text color={'gray.500'} fontSize={{ base: 'sm', sm: 'md' }}>
          {`Xin chào bạn ${name}`}
        </Text>
        <Text color={'gray.500'} fontSize={{ base: 'sm', sm: 'md' }}>
          {`SĐT: ${phone} - CCCD: ${citizenId}`}
        </Text>
      </Stack>
      <Box mt={10}>
        <FormikProvider value={formik}>
          <Form noValidate>
            <Stack spacing={4}>
              <Radios isRequired label='Vai trò trong nhóm' name='roleInGroup'>
                <Radio value='0'>Trưởng nhóm</Radio>
                <Radio value='1'>Phó nhóm</Radio>
                <Radio value='2'>Cá nhân</Radio>
              </Radios>
              <FloatingLabel
                name='citizenIdOfLeader'
                label='Số căn cước của trưởng nhóm'
                color={formTextColor}
                isRequired
              />
              <FloatingLabel name='buddhistName' label='Pháp danh' color={formTextColor} />
              <Radios label='Giới tính' name='gender' defaultValue='0'>
                <Radio value='0'>Nam</Radio>
                <Radio value='1'>Nữ</Radio>
              </Radios>
              <FormControl as='fieldset' isRequired>
                <FormLabel as='legend' color={formTextColor}>
                  Ngày sinh
                </FormLabel>
                <HStack align='flex-end'>
                  <FloatingLabel name='dayOfBirth' label='Ngày' color={formTextColor} />
                  <Select placeholder='Tháng' name='monthOfBirth' data={monthOfBirth} />
                  <FloatingLabel name='yearOfBirth' label='Năm' color={formTextColor} />
                </HStack>
              </FormControl>
              <FloatingLabel name='email' label='Email' color={formTextColor} isRequired />
              <Address name='permanentAddress' label='Địa chỉ thường trú' isRequired />
              <Address name='temporaryAddress' label='Địa chỉ tạm trú' isRequired />
              <Select
                name='youthAssociationList'
                data={youthAssociationList}
                label='Nơi sinh hoạt'
                isRequired
              />
              <Select
                name='groupOfYouthAssociation'
                data={groupOfYouthAssociationList}
                label='Tổ sinh hoạt'
                isRequired
              />
            </Stack>
            <Button type='submit' fontFamily={'heading'} mt={8} w={'full'}>
              Tiếp theo
            </Button>
          </Form>
        </FormikProvider>
      </Box>
    </Stack>
  );
};

export default Step2;
