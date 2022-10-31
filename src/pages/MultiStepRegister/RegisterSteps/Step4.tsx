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
  Textarea,
} from '@chakra-ui/react';
import React from 'react';
import useCustomColorMode from '~/hooks/useColorMode';
import { StepProps } from '..';

// số lần công quả
const numberOfServingList = [
  { id: 0, name: 'Chưa có' },
  { id: 1, name: '1 lần' },
  { id: 2, name: '2 lần' },
  { id: 3, name: '3 lần' },
  { id: 4, name: 'Trên 3 lần' },
];
// const descNumberOfServingList = ['Chưa lần nào', '1 lần', '2 lần', '3 lần', 'Trên 3 lần'];

// danh sách ban
const departmentList = [
  { id: 0, code: 'chuaco', name: 'Chưa có' },
  { id: 1, code: 'BV', name: 'bảo vệ' },
  { id: 2, code: 'HD1', name: 'hanh duong 1' },
  { id: 3, code: 'HD2', name: 'hanh duong 2' },
];

// kỹ năng
const skillList = [
  { id: 0, code: 'Chưa có', name: 'Chưa có' },
  { id: 1, code: 'Cắm hoa', name: 'Cắm hoa' },
  { id: 2, code: 'Cắt tỉa trang trí món', name: 'Cắt tỉa trang trí món' },
  { id: 3, code: 'Chưng trái cây nghệ thuật', name: 'Chưng trái cây nghệ thuật' },
  { id: 4, code: 'Cơ khí', name: 'Cơ khí' },
  { id: 5, code: 'Cắt may cơ bản', name: 'Cắt may cơ bản' },
  { id: 6, code: 'Ngoại ngữ', name: 'Ngoại ngữ' },
];

// nơi nhận thẻ
const receiveCardLocationList = [
  {
    id: 1,
    code: 'HCMXL',
    name: '18h00 - 19h30, Thứ Tư (03/08/2022), Chùa Xá Lợi, 89 Bà Huyện Thanh Quan, P.7, Q.3',
  },
  {
    id: 2,
    code: 'HCMNL',
    name: '18h00 - 19h30, Thứ Năm (04/08/2021), Chùa Định Phước Di Đà, Gần khu chợ nhỏ ĐH. Nông Lâm, Q.Thủ Đức',
  },
  {
    id: 3,
    code: 'HCMBDT',
    name: '9h00 – 19h00, Thứ Sáu, Thứ Bảy, Chủ Nhật, Thứ Hai (05/08 - 08/08/2022) tại 47/96 Bùi Đình Túy - Q.Bình Thạnh',
  },
  { id: 999, code: 'BD', name: 'Gửi bưu điện' },
];

const Step4 = (props: StepProps) => {
  const { nextStep } = props;
  const { bgColor, primaryColor, formTextColor } = useCustomColorMode();

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
          Công việc
        </Heading>
        <Text color={'gray.500'} fontSize={{ base: 'sm', sm: 'md' }}>
          PL.2565 - DL.2022
        </Text>
      </Stack>
      <Box as={'form'} mt={10}>
        <Stack spacing={4}>
          <FormControl name='numberOfServing' as='fieldset' border={1}>
            <FormLabel as='legend' color={formTextColor}>
              Số lần về chùa công quả
            </FormLabel>
            <RadioGroup defaultValue='0' color={formTextColor}>
              <HStack spacing='24px'>
                {numberOfServingList?.map((item) => (
                  <Radio value={item.id} key={item.id}>
                    {item.name}
                  </Radio>
                ))}
              </HStack>
            </RadioGroup>
          </FormControl>
          <FormControl name='skill' as='fieldset' border={1}>
            <FormLabel as='legend' color={formTextColor}>
              Kỹ năng, sở trường
            </FormLabel>
            <Select>
              {skillList?.map((item) => (
                <option value={item.id} key={item.id}>
                  {item.name}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl name='experienceDept' as='fieldset' border={1}>
            <FormLabel as='legend' color={formTextColor}>
              Kinh nghiệm ở ban
            </FormLabel>
            <Select>
              {departmentList?.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl name='aspirationDept' as='fieldset' border={1}>
            <FormLabel as='legend' color={formTextColor}>
              Nguyện vọng vào ban
            </FormLabel>
            <Select>
              {departmentList?.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl name='receiveCardLocation' as='fieldset' border={1}>
            <FormLabel as='legend' color={formTextColor}>
              Nơi nhận thẻ
            </FormLabel>
            <Select>
              {receiveCardLocationList?.map((item) => (
                <option value={item.id} key={item.id}>
                  {item.name}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl name='receiveCardLocation' as='fieldset' border={1}>
            <FormLabel as='legend' color={formTextColor}>
              Hình thẻ
            </FormLabel>
            thẻ
          </FormControl>
          <FormControl name='note' as='fieldset' border={1}>
            <FormLabel as='legend' color={formTextColor}>
              Ghi chú
            </FormLabel>
            <Textarea placeholder='Huynh đệ có thắc mắc gì không ạ?' size='sm' />
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

export default Step4;
