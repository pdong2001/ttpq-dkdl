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
  Image,
  AspectRatio,
  Flex,
  FormHelperText,
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
import { useContext } from 'react';
import { MessageContext } from '~/providers/message';
import sampleAvatar from '~/assets/misc/avatar_temp.png';
import { NamedTimeDto } from '~/dtos/NamedTimes/NamedTimeDto.model';
import CropImage from '~/components/Form/CropImage';

const mapObjectArrayToIds = (array) => array?.map(({ id }) => id) || [];

const Step4 = (props: StepProps) => {
  const { nextStep, previousStep } = props;
  const { primaryColor } = useCustomColorMode();
  const dispatch = useAppDispatch();
  const messageService = useContext(MessageContext);

  const { eventId, id, type, ctnId, receiveVolunteeCert } = useAppSelector(
    (state) => state.registerPage.data,
  );
  const {
    expDepartments,
    wishDepartment,
    member,
    receiveCardAddressId: editReceiverCardId,
    // thêm field
    clothingSize: editClothingSize,
    question: editNote,
    registeredDays: editServeDays,
  } = useAppSelector((state) => state.registerInfo.data);
  const {
    strongPoints,
    avatarPath: editAvatarPath,
    exps: editExps,
    identityCardImagePaths: editIdentityCardPaths,
  } = member || {};
  const previousStepData = useAppSelector((state) => state.register.data);

  const { strongPointIds, avatarPath, exps, identityCardImagePaths } = previousStepData;
  const {
    expDepartmentIds,
    wishDepartmentId,
    receiveCardAddressId,
    // thêm field
    clothingSize,
    question,
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
  const { departments, event } = registerPage;
  const { days } = event || {};

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
      identityCardImagePathFront: identityCardImagePaths?.[0] || editIdentityCardPaths?.[0] || '',
      // identityCardImagePathBack: '',
      identityCardImagePaths: '',
      question: question || editNote || '',
      registeredDays: [],
    },
    validationSchema: step4Schema(days),
    onSubmit: (values) => {
      const {
        strongPointIds,
        expDepartmentIds,
        avatarPath,
        exps,
        wishDepartmentId,
        receiveCardAddressId,
        question,
        // thêm field
        clothingSize,
        identityCardImagePathFront,
        // identityCardImagePathBack,
        registeredDays,
      } = values;
      if (!identityCardImagePathFront) {
        return messageService.add({
          title: 'HD vui lòng bổ sung CCCD để hoàn tất thủ tục đăng ký',
          status: 'error',
        });
      }
      if (!avatarPath) {
        return messageService.add({
          title: 'HD vui lòng bổ sung ảnh thẻ theo hình mẫu',
          status: 'error',
        });
      }
      const identityCardImagePaths = [identityCardImagePathFront];
      const fillData = {
        strongPointIds,
        exps,
        avatarPath,
        identityCardImagePaths,
        register: {
          ...previousStepData.register,
          expDepartmentIds,
          question,
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
        question,
        type,
        exps,
        strongPointIds,
        expDepartmentIds,
        wishDepartmentId,
        receiveCardAddressId,
        clothingSize,
        registeredDays,
      });
      if (receiveVolunteeCert) {
        nextStep();
      } else {
        nextStep(6);
      }
    },
  });

  const mapMultiTitle = ({
    avatarPath,
    question,
    type,
    exps,
    strongPointIds,
    expDepartmentIds,
    wishDepartmentId,
    receiveCardAddressId,
    clothingSize,
    registeredDays,
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
        question,
        type,
        avatarPath,
        exps,
        strongPointIds: mapName(strongPointList, strongPointIds),
        expDepartmentIds: mapName(departments, expDepartmentIds),
        wishDepartmentId: mapName(departments, [+wishDepartmentId]),
        receiveCardAddressId: mapName(receiveCardAddresses, [+receiveCardAddressId]),
        clothingSize,
        registeredDays: registeredDays.map((dayId) => days?.find((date) => date.id == dayId)?.name),
      }),
    );
  };

  return (
    <FadeInUp delay={0}>
      <Stack spacing={4}>
        <Heading
          color={primaryColor}
          lineHeight={1.1}
          fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}
        >
          Công việc
        </Heading>
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
                options={days}
                label='Thời gian công quả ở chùa'
                optionValue='id'
                optionLabel='name'
                closeMenuOnSelect={false}
                isRequired={!!days?.length}
                placeholder='Thời gian công quả'
                helperText='HD vui lòng chọn ĐẦY ĐỦ ngày công quả tại chùa'
              />
              <OurSelect
                isMulti
                name='strongPointIds'
                options={strongPointList}
                label='Kỹ năng, sở trường'
                optionValue='id'
                optionLabel='name'
                placeholder='Chọn kỹ năng, sở trường'
              />
              <OurSelect
                isMulti
                name='expDepartmentIds'
                options={departments}
                label='Kinh nghiệm ở ban'
                optionValue='id'
                optionLabel='name'
                placeholder='Chọn ban kinh nghiệm'
              />
              <OurSelect
                name='wishDepartmentId'
                options={departments}
                label='Nguyện vọng vào ban'
                placeholder='Chọn ban nguyện vọng'
                optionValue='id'
                optionLabel='name'
                isRequired
              />
              {!!receiveCardAddresses.length && (
                <OurSelect
                  name='receiveCardAddressId'
                  options={receiveCardAddresses}
                  optionValue='id'
                  optionLabel='name'
                  label='Nơi nhận thẻ'
                  placeholder='Chọn nơi nhận thẻ'
                />
              )}
              {/* thêm field */}
              <OurSelect
                name='clothingSize'
                options={ClothingSize.getList()}
                label='Size áo'
                placeholder='Chọn size áo'
                isRequired
                isSearchable={false}
              />
              <Flex justifyContent='center'>
                <Image srcSet={sampleAvatar} width={[64, 80]} />
              </Flex>
              <Stack direction={{ base: 'column', lg: 'row' }}>
                <FormControl name='avatarPath' as='fieldset' border={1}>
                  <FormLabel as='legend'>Hình thẻ</FormLabel>
                  <Box display={{ base: 'none', lg: 'none' }}>
                    {/* <CropImage aspect={3 / 4} name='avatarPath' /> */}
                  </Box>

                  <Box display={{ base: 'block', lg: 'block' }}>
                    <UploadFile ratio={3 / 4} name='avatarPath' />
                  </Box>
                  <FormHelperText color='red' fontSize={12}>
                    HD vui lòng gửi ảnh đúng quy chuẩn với hình ảnh minh họa (bên trên)
                  </FormHelperText>
                </FormControl>

                <FormControl name='identityCardImagePathFront' as='fieldset' border={1}>
                  <FormLabel as='legend'>Hình ảnh MẶT TRƯỚC CCCD/CMND/Hộ Chiếu</FormLabel>
                  <Box display={{ base: 'none', lg: 'none' }}>
                    {/* <CropImage aspect={16 / 9} width={'72'} name='identityCardImagePathFront' /> */}
                  </Box>

                  <Box display={{ base: 'block', lg: 'block' }}>
                    <UploadFile ratio={16 / 9} width={'72'} name='identityCardImagePathFront' />
                  </Box>
                  <FormHelperText color='red' fontSize={12}>
                    HD vui lòng gửi ảnh chụp mặt TRƯỚC ảnh CCCD/CMND/Hộ Chiếu để được bảo lãnh ở
                    Chùa
                  </FormHelperText>
                </FormControl>

                {/* <FormControl name='avatarPath' as='fieldset' border={1}>
                  <FormLabel as='legend'>CCCD mặt sau</FormLabel>
                  <UploadFile name='identityCardImagePathBack' />
                </FormControl> */}
              </Stack>
              <FormInput
                name='question'
                label='Ghi chú/ thắc mắc của HĐ'
                as={Textarea}
                placeholder='Huynh đệ có thắc mắc gì không ạ?'
              />
            </Stack>
            <SimpleGrid columns={{ base: 2 }} spacing={{ base: 4, lg: 8 }} mt={8} w={'full'}>
              <Button
                colorScheme='gray'
                flexGrow={1}
                fontFamily={'heading'}
                onClick={() => previousStep()}
              >
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
