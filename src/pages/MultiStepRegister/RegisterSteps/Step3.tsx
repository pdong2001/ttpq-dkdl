import {
  Stack,
  Heading,
  FormControl,
  FormLabel,
  Button,
  Box,
  Text,
  Select,
} from '@chakra-ui/react';
import React from 'react';
import useCustomColorMode from '~/hooks/useColorMode';
import { StepProps } from '..';

// nơi xuất phát
const departLocationList = [
  { id: 0, code: 'tutuc', name: 'Tự túc' },
  { id: 1, code: 'hcm-nonglam', name: 'Bến xe buýt Trường Đại học Nông Lâm' },
  {
    id: 2,
    code: 'hcm-bdt',
    name: 'Cầu Bùi Đình Túy, số 47 Bùi Đình Túy, P.24, Q. Bình Thạnh, Tp.HCM',
  },
];
// thời điểm khởi hành
const timeToStartList = [
  { id: 0, code: 'tutuc', name: 'Tự túc' },
  { id: 1, code: 'dot1', name: 'Đợt 1: 19h45 Thứ hai, ngày 08/08/2022' },
  { id: 2, code: 'dot2', name: 'Đợt 2: 19h45 Thứ ba, ngày 09/08/2022 (Đợt chính thức)' },
  { id: 3, code: 'dot3', name: 'Đợt 3: 06h00 Thứ tư, ngày 10/08/2022' },
];

// thời điểm về lại nơi xuất phát
const timeToReturnList = [
  { id: 0, code: 'tutuc', name: 'Tự túc' },
  { id: 1, code: 'dot1', name: 'Đợt 1: 18h00 Thứ sáu, ngày 12/08/2022' },
  { id: 2, code: 'dot2', name: 'Đợt 2: 18h00 Chủ nhật, ngày 14/08/2022' },
];

const Step3 = (props: StepProps) => {
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
          Lịch trình
        </Heading>
        <Text color={'gray.500'} fontSize={{ base: 'sm', sm: 'md' }}>
          PL.2565 - DL.2022
        </Text>
      </Stack>
      <Box as={'form'} mt={10}>
        <Stack spacing={4}>
          <FormControl name='departLocation' as='fieldset' border={1}>
            <FormLabel as='legend' color={formTextColor}>
              Nơi xuất phát
            </FormLabel>
            <Select>
              {departLocationList?.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl name='timeToStart' as='fieldset' border={1}>
            <FormLabel as='legend' color={formTextColor}>
              Thời gian khởi hành
            </FormLabel>
            <Select>
              {timeToStartList?.map((item) => (
                <option value={item.id} key={item.id}>
                  {item.name}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl name='timeToReturn' as='fieldset' border={1}>
            <FormLabel as='legend' color={formTextColor}>
              Thời gian trở về
            </FormLabel>
            <Select>
              {timeToReturnList?.map((item) => (
                <option value={item.id} key={item.id}>
                  {item.name}
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

export default Step3;
