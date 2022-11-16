import { Stack, Heading, Button, Box, Text, SimpleGrid } from '@chakra-ui/react';
import useCustomColorMode from '~/hooks/useColorMode';
import { StepProps } from '..';
import { useAppDispatch, useAppSelector } from '~/hooks/reduxHook';
import { register } from '../../../slices/register';
import { unwrapResult } from '@reduxjs/toolkit';

const Step5 = (props: StepProps) => {
  const { previousStep, nextStep } = props;
  const { primaryColor } = useCustomColorMode();
  const dispatch = useAppDispatch();
  const formData = useAppSelector((state) => state.register.data);
  const handleRegister = () => {
    dispatch(
      register({
        data: formData,
      }),
    )
      .then(unwrapResult)
      .then(() => {
        nextStep();
      })
      .catch((e) => {
        alert(e.message || 'Dạ có lỗi xảy ra ạ');
        console.log('Dạ có lỗi xảy ra ạ', e);
      });
  };
  return (
    <>
      <Stack spacing={4}>
        <Heading
          color={primaryColor}
          lineHeight={1.1}
          fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}
        >
          Xác nhận đăng ký
        </Heading>
        <Text color={'gray.500'} fontSize={{ base: 'sm', sm: 'md' }}>
          PL.2565 - DL.2022
        </Text>
      </Stack>
      <Box mt={10}>
        <Stack spacing={4}></Stack>
        <SimpleGrid columns={{ base: 2 }} spacing={{ base: 4, lg: 8 }} mt={8} w={'full'}>
          <Button colorScheme='gray' flexGrow={1} fontFamily={'heading'} onClick={previousStep}>
            Trở về
          </Button>
          <Button flexGrow={1} fontFamily={'heading'} onClick={handleRegister}>
            Đăng ký
          </Button>
        </SimpleGrid>
      </Box>
    </>
  );
};

export default Step5;
