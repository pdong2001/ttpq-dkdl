import {
  Stack,
  Heading,
  Button,
  Box,
  Text,
  Textarea,
  FormControl,
  FormLabel,
  SimpleGrid,
  Radio,
} from '@chakra-ui/react';
import useCustomColorMode from '~/hooks/useColorMode';
import { StepProps } from '..';
import Select from '~/components/Form/CustomSelect';
import { Form, FormikProvider, useFormik } from 'formik';
// import UploadFile from '~/components/Form/UploadFile';
import Radios from '~/components/Form/Radios';
import API from '~/apis/constants';
import { formatUrl } from '~/utils/functions';
import { useAppDispatch, useAppSelector } from '~/hooks/reduxHook';
import step4Schema from '../validationSchema/step4';
import UploadFile from '~/components/Form/UploadFile';
import { register } from '../services';
import MultiSelect from '~/components/Form/MultiSelect';
import useAxios from '~/hooks/useAxios';
import { EventExp } from '~/dtos/Enums/EventExp.enum';
import { unwrapResult } from '@reduxjs/toolkit';
import { fillForm } from '../services/slice';
// import AvatarTemp from '~/assets/avatar_temp.png';

// danh sách ban
// const departmentList = [
//   { id: 0, code: 'chuaco', name: 'Chưa có' },
//   { id: 1, code: 'BV', name: 'bảo vệ' },
//   { id: 2, code: 'HD1', name: 'hanh duong 1' },
//   { id: 3, code: 'HD2', name: 'hanh duong 2' },
// ];

// kỹ năng
// const strongPointListTemp = [
//   { id: 0, code: 'Chưa có', name: 'Chưa có' },
//   { id: 1, code: 'Cắm hoa', name: 'Cắm hoa' },
//   { id: 2, code: 'Cắt tỉa trang trí món', name: 'Cắt tỉa trang trí món' },
//   { id: 3, code: 'Chưng trái cây nghệ thuật', name: 'Chưng trái cây nghệ thuật' },
//   { id: 4, code: 'Cơ khí', name: 'Cơ khí' },
//   { id: 5, code: 'Cắt may cơ bản', name: 'Cắt may cơ bản' },
//   { id: 6, code: 'Ngoại ngữ', name: 'Ngoại ngữ' },
// ];

// nơi nhận thẻ
// const receiveCardLocationList = [
//   {
//     id: 1,
//     code: 'HCMXL',
//     name: '18h00 - 19h30, Thứ Tư (03/08/2022), Chùa Xá Lợi, 89 Bà Huyện Thanh Quan, P.7, Q.3',
//   },
//   {
//     id: 2,
//     code: 'HCMNL',
//     name: '18h00 - 19h30, Thứ Năm (04/08/2021), Chùa Định Phước Di Đà, Gần khu chợ nhỏ ĐH. Nông Lâm, Q.Thủ Đức',
//   },
//   {
//     id: 3,
//     code: 'HCMBDT',
//     name: '9h00 – 19h00, Thứ Sáu, Thứ Bảy, Chủ Nhật, Thứ Hai (05/08 - 08/08/2022) tại 47/96 Bùi Đình Túy - Q.Bình Thạnh',
//   },
//   { id: 999, code: 'BD', name: 'Gửi bưu điện' },
// ];

const Step4 = (props: StepProps) => {
  const { nextStep, previousStep } = props;
  const { primaryColor, formTextColor } = useCustomColorMode();
  const dispatch = useAppDispatch();

  // lấy kĩ năng sở trường
  let { data: strongPointList } = useAxios(
    {
      method: 'get',
      url: API.GET_STRONG_POINT,
      transformResponse: ({ data }) => data,
    },
    [],
  );

  const { data: registerPage } = useAppSelector((state) => state.registerPage);
  const { departments } = registerPage;

  // lấy nơi nhận thẻ
  const { data: receiveCardLocationList } = useAxios({
    method: 'get',
    url: formatUrl(API.GET_RECEIVE_CARD_ADDRESSES_BY_EVENT, { id: 1 }),
    transformResponse: ({ data }) => data,
  });

  const previousStepData = useAppSelector((state) => state.register.data);

  const { eventId, id, type, ctnId } = useAppSelector((state) => state.registerPage.data);
  const { strongPointIds, avatarPath, exps } = previousStepData;
  const { expDepartmentIds, wishDepartmentIds, receiveCardAddressId, note } =
    previousStepData.register;
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      exps: exps || EventExp.ChuaTungThamGia,
      strongPointIds: strongPointIds || [],
      expDepartmentIds: expDepartmentIds || [],
      wishDepartmentIds: wishDepartmentIds?.[0] || '',
      receiveCardAddressId: receiveCardAddressId || '',
      avatarPath: avatarPath || '',
      note: note || '',
    },
    validationSchema: step4Schema,
    onSubmit: (values) => {
      const {
        strongPointIds,
        expDepartmentIds,
        avatarPath,
        exps,
        wishDepartmentIds,
        receiveCardAddressId,
        note,
      } = values;
      dispatch(
        fillForm({
          strongPointIds,
          exps,
          register: {
            ...previousStepData.register,
            expDepartmentIds,
            avatarPath,
            note,
            receiveCardAddressId,
            wishDepartmentIds: [wishDepartmentIds],
            eventId,
            eventRegistryPageId: id,
            ctnId,
            type,
          },
        }),
      );
      nextStep();
    },
  });

  console.log('formiks', formik.values, formik.errors);

  return (
    <>
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
      <Box mt={10}>
        <FormikProvider value={formik}>
          <Form noValidate>
            <Stack spacing={4}>
              <Radios name='exps' label='Số lần về chùa công quả'>
                <Radio value={EventExp.ChuaTungThamGia}>Lần đầu tiên</Radio>
                <Radio value={EventExp.Duoi3Lan}>Dưới 3 lần</Radio>
                <Radio value={EventExp.Tren3Lan}>Trên 3 lần</Radio>
              </Radios>
              <MultiSelect
                name='strongPointIds'
                options={strongPointList}
                label='Kỹ năng, sở trường'
                valueField='id'
                labelField='name'
              />
              <MultiSelect
                name='expDepartmentIds'
                options={departments}
                label='Kinh nghiệm ở ban'
                valueField='id'
                labelField='name'
                isRequired
              />
              <Select
                name='wishDepartmentIds'
                data={departments}
                label='Nguyện vọng vào ban'
                placeholder='Chọn ban'
                isRequired
              />
              <Select
                name='receiveCardAddressId'
                data={receiveCardLocationList}
                label='Nơi nhận thẻ'
                placeholder='Chọn nơi nhận thẻ'
                isRequired
              />
              <FormControl name='avatarPath' as='fieldset' border={1}>
                <FormLabel as='legend' color={formTextColor}>
                  Hình thẻ
                </FormLabel>
                <UploadFile />
              </FormControl>
              <FormControl name='note' as='fieldset' border={1}>
                <FormLabel as='legend' color={formTextColor}>
                  Ghi chú
                </FormLabel>
                <Textarea placeholder='Huynh đệ có thắc mắc gì không ạ?' size='sm' />
              </FormControl>
            </Stack>
            <SimpleGrid columns={{ base: 2 }} spacing={{ base: 4, lg: 8 }} mt={8} w={'full'}>
              <Button colorScheme='gray' flexGrow={1} fontFamily={'heading'} onClick={previousStep}>
                Trở về
              </Button>
              <Button flexGrow={1} type='submit' fontFamily={'heading'}>
                Tiếp theo
              </Button>
            </SimpleGrid>
          </Form>
        </FormikProvider>
      </Box>
    </>
  );
};

export default Step4;
