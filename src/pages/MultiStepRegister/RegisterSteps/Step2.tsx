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
  Select,
} from '@chakra-ui/react';
import React from 'react';
import FloatingLabel from '~/components/Form/FloatingLabel/FloatingLabel';
import useCustomColorMode from '~/hooks/useColorMode';
import { StepProps } from '..';

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

// địa chỉ
const provinceList = [
  {
    id: 1,
    ma: '80',
    ten: 'Long An',
    createdBy: 0,
    createdOn: '2019-03-15T15:20:01.373',
    editedBy: null,
    editedOn: '2019-03-15T15:20:01.373',
    idQuocGia: 57,
    huyens: null,
  },
  {
    id: 2,
    ma: '64',
    ten: 'Gia Lai',
    createdBy: 0,
    createdOn: '2019-03-15T15:20:01.39',
    editedBy: null,
    editedOn: '2019-03-15T15:20:01.39',
    idQuocGia: 57,
    huyens: null,
  },
];

// huyen
const districtList = [
  {
    id: 1,
    ma: '8014',
    ten: 'Châu Thành',
    createdBy: 0,
    createdOn: '2019-03-15T15:49:53.763',
    editedBy: null,
    editedOn: '2019-03-15T15:49:53.763',
    idTinh: 1,
    tinh: null,
    xas: null,
  },
  {
    id: 2,
    ma: '8009',
    ten: 'Bến Lức',
    createdBy: 0,
    createdOn: '2019-03-15T15:49:53.763',
    editedBy: null,
    editedOn: '2019-03-15T15:49:53.763',
    idTinh: 1,
    tinh: null,
    xas: null,
  },
];
const villageList = [
  {
    id: 848,
    ma: '800105',
    ten: 'P. 3',
    createdBy: 0,
    createdOn: '2019-03-15T16:23:16.997',
    editedBy: null,
    editedOn: '2019-03-15T16:23:16.997',
    idHuyen: 4,
    huyen: null,
  },
  {
    id: 2360,
    ma: '800101',
    ten: 'P. 5',
    createdBy: 0,
    createdOn: '2019-03-15T16:23:24.607',
    editedBy: null,
    editedOn: '2019-03-15T16:23:24.607',
    idHuyen: 4,
    huyen: null,
  },
];

// nơi sinh hoạt
const youthAssociationList = [
  {
    Id: 1,
    Name: 'CTN Hà Nội',
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
    Id: 2,
    Name: 'Tổ 1',
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
    Id: 1,
    Name: 'CTN Hà Nội',
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
    Id: 1403,
    Name: 'Thứ 2 Chùa Đồng',
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
      <Box as={'form'} mt={10}>
        <Stack spacing={4}>
          <FormControl as='fieldset' border={1} isRequired>
            <FormLabel as='legend' color={formTextColor}>
              Vai trò trong nhóm
            </FormLabel>
            <RadioGroup name='roleInGroup' defaultValue='0' color={formTextColor}>
              <HStack spacing='24px'>
                <Radio value='0'>Trưởng nhóm</Radio>
                <Radio value='1'>Phó nhóm</Radio>
                <Radio value='2'>Cá nhân</Radio>
                {/* <Radio value='3'>Đăng ký lẻ</Radio> */}
              </HStack>
            </RadioGroup>
          </FormControl>
          <FloatingLabel
            name='citizenIdOfLeader'
            label='Số căn cước của trưởng nhóm'
            color={formTextColor}
            isRequired
          />
          <FloatingLabel name='buddhistName' label='Pháp danh' color={formTextColor} />
          <FormControl as='fieldset' border={1} isRequired>
            <FormLabel as='legend' color={formTextColor}>
              Giới tính
            </FormLabel>
            <RadioGroup name='gender' defaultValue='0' color={formTextColor}>
              <HStack spacing='24px'>
                <Radio value='0'>Nam</Radio>
                <Radio value='1'>Nữ</Radio>
              </HStack>
            </RadioGroup>
          </FormControl>
          <FormControl as='fieldset' border={1} isRequired>
            <FormLabel as='legend' color={formTextColor}>
              Ngày sinh
            </FormLabel>
            <FloatingLabel name='dayOfBirth' label='Ngày' color={formTextColor} />
            <Select name='monthOfBirth'>
              {monthOfBirth?.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </Select>
            <FloatingLabel name='yearOfBirth' label='Năm' color={formTextColor} />
          </FormControl>
          <FloatingLabel name='email' label='Email' color={formTextColor} isRequired />
          <FormControl name='permanentAddress' as='fieldset' border={1} isRequired>
            <FormLabel as='legend' color={formTextColor}>
              Địa chỉ thường trú
            </FormLabel>
            <Select placeholder='Tỉnh'>
              {provinceList?.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.ten}
                </option>
              ))}
            </Select>
            <Select placeholder='Huyện'>
              {districtList?.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.ten}
                </option>
              ))}
            </Select>
            <Select placeholder='Xã'>
              {villageList?.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.ten}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl name='temporaryAddress' as='fieldset' border={1} isRequired>
            <FormLabel as='legend' color={formTextColor}>
              Địa chỉ tạm trú
            </FormLabel>
            <Select placeholder='Tỉnh'>
              {provinceList?.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.ten}
                </option>
              ))}
            </Select>
            <Select placeholder='Huyện'>
              {districtList?.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.ten}
                </option>
              ))}
            </Select>
            <Select placeholder='Xã'>
              {villageList?.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.ten}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl name='youthAssociation' as='fieldset' border={1} isRequired>
            <FormLabel as='legend' color={formTextColor}>
              Nơi sinh hoạt
            </FormLabel>
            <Select>
              {youthAssociationList?.map((item) => (
                <option key={item.Id} value={item.Id}>
                  {item.Name}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl name='groupOfYouthAssociation' as='fieldset' border={1}>
            <FormLabel as='legend' color={formTextColor}>
              Tổ sinh hoạt
            </FormLabel>
            <Select>
              {groupOfYouthAssociationList?.map((item) => (
                <option key={item.Id} value={item.Id}>
                  {item.Name}
                </option>
              ))}
            </Select>
          </FormControl>
        </Stack>
        <Button fontFamily={'heading'} mt={8} w={'full'} onClick={nextStep}>
          Tiếp theo
        </Button>
      </Box>
      form
    </Stack>
  );
};

export default Step2;
