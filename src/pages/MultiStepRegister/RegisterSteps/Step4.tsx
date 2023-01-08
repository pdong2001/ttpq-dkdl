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
import _ from 'lodash';
import { Form, FormikProvider, useFormik } from 'formik';
// import UploadFile from '~/components/Form/UploadFile';
import Radios from '~/components/Form/Radios';
import API from '~/apis/constants';
import { useAppDispatch, useAppSelector } from '~/hooks/reduxHook';
import step4Schema from '../validationSchema/step4';
import { fillDataPreview } from '~/slices/previewInfo';
import UploadFile from '~/components/Form/UploadFile';
import OurSelect from '~/components/Form/MultiSelect';
import useAxios from '~/hooks/useAxios';
import { EventExp } from '~/dtos/Enums/EventExp.enum';
import { fillForm } from '~/slices/register';
import FormInput from '~/components/Form/FormInput';
import FadeInUp from '~/components/Animation/FadeInUp';
import { ClothingSize } from '~/dtos/Enums/ClothingSize.enum';
import moment from 'moment';
import { EventRegistryDto } from '~/dtos/EventRegistries/EventRegistryDto.model';

const mapObjectArrayToIds = (array) => array?.map(({ id }) => id) || [];

const Step4 = (props: StepProps) => {
  const { nextStep, previousStep } = props;
  const { primaryColor } = useCustomColorMode();
  const dispatch = useAppDispatch();

  const { eventId, id, type, ctnId } = useAppSelector((state) => state.registerPage.data);
  const {
    expDepartments,
    wishDepartment,
    member,
    receiveCardAddressId: editReceiverCardId,
    // thêm field
    clothingSize: editClothingSize,
    note: editNote,
    registeredDays: editServeDays,
  } = useAppSelector((state) => state.registerInfo.data);
  const { strongPoints, avatarPath: editAvatarPath, exps: editExps } = member || {};
  const previousStepData = useAppSelector((state) => state.register.data);

  const { strongPointIds, avatarPath, exps } = previousStepData;
  const {
    expDepartmentIds,
    wishDepartmentId,
    receiveCardAddressId,
    // thêm field
    clothingSize,
    note,
  } = previousStepData.register || {};

  // lấy kĩ năng sở trường
  const { data: strongPointList } = useAxios(
    {
      method: 'get',
      url: API.GET_STRONG_POINT,
      transformResponse: ({ data }) => data,
    },
    [],
  );

  const { data: registerPage } = useAppSelector((state) => state.registerPage);
  const { departments, days } = registerPage;
  const serveDates = days?.map((date) => {
    const newDate = { ...date };
    const formattedDate = moment(date.time).format('DD-MM-yyyy');
    if (newDate?.name && newDate.name != formattedDate) {
      newDate.name = `${newDate.name} (${formattedDate})`;
    }
    return newDate;
  });

  // lấy nơi nhận thẻ
  const { receiveCardAddresses = [] } = useAppSelector((state) => state.registerPage.data);
  // const { data: receiveCardLocationList } = useAxios({
  //   method: 'get',
  //   url: formatUrl(API.GET_RECEIVE_CARD_ADDRESSES_BY_EVENT, { id: eventId }),
  //   transformResponse: ({ data }) => data.map(mapReceiverCardAddressDetail),
  // });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      exps: (exps && exps + '') || (editExps && editExps + '') || EventExp.ChuaTungThamGia,
      strongPointIds: strongPointIds || mapObjectArrayToIds(strongPoints) || [],
      expDepartmentIds: expDepartmentIds || mapObjectArrayToIds(expDepartments) || [],
      wishDepartmentId: wishDepartmentId || wishDepartment?.id || '',
      receiveCardAddressId: receiveCardAddressId || editReceiverCardId || '',
      // thêm field
      clothingSize: clothingSize || editClothingSize || '',
      avatarPath: avatarPath || editAvatarPath || '',
      identityCardImagePathFront: '',
      identityCardImagePathBack: '',
      identityCardImagePaths: '',
      note: note || editNote || '',
      registeredDays: [],
    },
    validationSchema: step4Schema,
    onSubmit: (values) => {
      const {
        strongPointIds,
        expDepartmentIds,
        avatarPath,
        exps,
        wishDepartmentId,
        receiveCardAddressId,
        note,
        // thêm field
        clothingSize,
        identityCardImagePathFront,
        // identityCardImagePathBack,
        registeredDays,
      } = values;
      const identityCardImagePaths = [identityCardImagePathFront];
      const fillData = {
        strongPointIds,
        exps,
        avatarPath,
        identityCardImagePaths,
        register: {
          ...previousStepData.register,
          expDepartmentIds,
          note,
          receiveCardAddressId,
          wishDepartmentId,
          eventId,
          eventRegistryPageId: id,
          ctnId,
          type,
          // thêm field
          clothingSize,
          registeredDays,
        } as EventRegistryDto,
      };
      dispatch(fillForm(fillData));
      mapMultiTitle({
        avatarPath,
        note,
        type,
        exps,
        strongPointIds,
        expDepartmentIds,
        wishDepartmentId,
        receiveCardAddressId,
        clothingSize,
      });
      nextStep();
    },
  });

  const mapMultiTitle = ({
    avatarPath,
    note,
    type,
    exps,
    strongPointIds,
    expDepartmentIds,
    wishDepartmentId,
    receiveCardAddressId,
    clothingSize,
  }) => {
    function mapName(array, ids) {
      return _.map(
        _.filter(array, function (p) {
          return _.includes(ids, p.id);
        }),
        (a) => a.name,
      ).join(', ');
    }
    dispatch(
      fillDataPreview({
        note,
        type,
        avatarPath,
        exps,
        strongPointIds: mapName(strongPointList, strongPointIds),
        expDepartmentIds: mapName(departments, expDepartmentIds),
        wishDepartmentId: mapName(departments, [+wishDepartmentId]),
        receiveCardAddressId: mapName(receiveCardAddresses, [+receiveCardAddressId]),
        clothingSize,
      }),
    );
  };

  return (
    <FadeInUp>
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
                <Radio value={EventExp.ChuaTungThamGia}>
                  {EventExp.toString(EventExp.ChuaTungThamGia)}
                </Radio>
                <Radio value={EventExp.Duoi3Lan}>{EventExp.toString(EventExp.Duoi3Lan)}</Radio>
                <Radio value={EventExp.Tren3Lan}>{EventExp.toString(EventExp.Tren3Lan)}</Radio>
              </Radios>
              <OurSelect
                isMulti
                name='registeredDays'
                options={serveDates}
                label='Thời gian công quả ở chùa'
                optionValue='id'
                optionLabel='name'
                closeMenuOnSelect={false}
                isRequired
              />
              <OurSelect
                isMulti
                name='strongPointIds'
                options={strongPointList}
                label='Kỹ năng, sở trường'
                optionValue='id'
                optionLabel='name'
              />
              <OurSelect
                name='expDepartmentIds'
                options={departments}
                label='Kinh nghiệm ở ban'
                optionValue='id'
                optionLabel='name'
              />
              <OurSelect
                name='wishDepartmentId'
                options={departments}
                label='Nguyện vọng vào ban'
                placeholder='Chọn ban'
                optionValue='id'
                optionLabel='name'
                isRequired
              />
              <OurSelect
                name='receiveCardAddressId'
                options={receiveCardAddresses}
                optionValue='id'
                optionLabel='name'
                // labelField='address'
                label='Nơi nhận thẻ'
                placeholder='Chọn nơi nhận thẻ'
              />
              {/* thêm field */}
              <OurSelect
                name='clothingSize'
                options={ClothingSize.getList()}
                label='Size áo'
                placeholder='Chọn size áo'
                isRequired
              />

              <Stack direction={{ base: 'column', lg: 'row' }}>
                <FormControl name='avatarPath' as='fieldset' border={1}>
                  <FormLabel as='legend'>Hình thẻ</FormLabel>
                  <UploadFile name='avatarPath' />
                </FormControl>

                <FormControl name='avatarPath' as='fieldset' border={1}>
                  <FormLabel as='legend'>CCCD mặt trước</FormLabel>
                  <UploadFile name='identityCardImagePathFront' />
                </FormControl>

                {/* <FormControl name='avatarPath' as='fieldset' border={1}>
                  <FormLabel as='legend'>CCCD mặt sau</FormLabel>
                  <UploadFile name='identityCardImagePathBack' />
                </FormControl> */}
              </Stack>
              <FormInput
                name='note'
                label='Ghi chú'
                as={Textarea}
                placeholder='Huynh đệ có thắc mắc gì không ạ?'
              />
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
    </FadeInUp>
  );
};

export default Step4;
