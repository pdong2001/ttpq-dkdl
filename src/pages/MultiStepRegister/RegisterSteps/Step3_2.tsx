import { Stack, Heading, Button, Box, Text, Radio, SimpleGrid, Tag } from '@chakra-ui/react';
import _ from 'lodash';
import useCustomColorMode from '~/hooks/useColorMode';
import { StepProps } from '..';
import { Form, FormikProvider, useFormik } from 'formik';
import Radios from '~/components/Form/Radios';
import { fillDataPreview } from '~/slices/previewInfo';
import FloatingLabel from '~/components/Form/FloatingLabel/FloatingLabel';
import { useAppDispatch, useAppSelector } from '~/hooks/reduxHook';
import { useEffect, useState } from 'react';
import { fillForm } from '../../../slices/register';
import step3Schema from '../validationSchema/step3_2';
import { MoveType } from '~/dtos/Enums/MoveType.enum';
import DateTimePicker from '~/components/Form/DatePicker';
import { LeaveTimeDto } from '~/dtos/TimeToLeaves/LeaveTimeDto.model';
import { StartTimeDto } from '~/dtos/StartTimes/StartTimeDto.model';
import { useRouteMatch } from 'react-router-dom';
import { convertToAppDateTime } from '~/utils/date';
import { StartAddressDto } from '~/dtos/Addresses/StartAddressDto.model';
import { LeaveAddressDto } from '~/dtos/LeaveAddresses/LeaveAddressDto.model';
import FadeInUp from '~/components/Animation/FadeInUp';
import { CarBookingType } from '~/dtos/Enums/CarBookingType.enum';
import OurSelect from '~/components/Form/MultiSelect';

type Time = StartTimeDto | LeaveTimeDto;
const mappingTime = (times: Time[]) => {
  if (!times) return [];
  return times.map((t) => {
    const { time, name } = t || {};
    return { ...t, name: `${name}, ${convertToAppDateTime(time)}` };
  });
};
type Address = StartAddressDto | LeaveAddressDto;
const mappingAddress = (addresses: Address[] | undefined) => {
  if (!addresses) return [];
  return addresses.map((addr) => {
    const { address, name } = addr || {};
    return { ...addr, name: `${name}, ${address}` };
  });
};

const Step3 = (props: StepProps) => {
  const { path } = useRouteMatch();
  const { nextStep, previousStep } = props;
  const { primaryColor } = useCustomColorMode();
  const dispatch = useAppDispatch();
  const { data: registerPage } = useAppSelector((state) => state.registerPage);
  const { leaveAddresses, startAddresses, canMoveByPlane } = registerPage;

  const { register } = useAppSelector((state) => state.register.data);
  const {
    returnMoveType: editMoveType,
    leaveTimeId: editLeaveTimeId,
    otherLeaveAddress: editOtherLeaveAddress,
    otherLeaveTime: editOtherLeaveTime,
    returnPlaneCode: editReturnPlaneCode,
    leaveTime,
    //thêm field
    carBookingType: editCarBookingType,
  } = useAppSelector((state) => state.registerInfo.data);
  const { addressId: editLeaveAddressId } = leaveTime || {};
  const {
    returnMoveType: moveTypeInStore,
    leaveAddressId: leaveAddressIdInStore = '',

    leaveTimeId: leaveTimeIdInStore = '',

    returnPlaneCode = '',
    otherLeaveTime = '',
    otherLeaveAddress = '',
    // thêm field
    carBookingType: carBookingTypeInStore,
  } = register || {};

  const hasLeaveAddress = !!leaveAddresses?.length;

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      returnMoveType:
        moveTypeInStore ||
        (!!editMoveType && editMoveType + '') ||
        (hasLeaveAddress ? MoveType.WithCTN : canMoveByPlane && MoveType.ByPlane) ||
        MoveType.Other,

      leaveAddressId: leaveAddressIdInStore || editLeaveAddressId,
      leaveTimeId: leaveTimeIdInStore || editLeaveTimeId,

      otherLeaveAddress: otherLeaveAddress || editOtherLeaveAddress,
      otherLeaveTime: otherLeaveTime || editOtherLeaveTime,
      returnPlaneCode: returnPlaneCode || editReturnPlaneCode,
      // thêm field
      carBookingType:
        carBookingTypeInStore ||
        (editCarBookingType ? editCarBookingType + '' : CarBookingType.Both),
    },
    validationSchema: step3Schema,
    onSubmit: (values) => {
      if (returnMoveType != MoveType.WithCTN) {
        // máy bay
        values.leaveAddressId = undefined;
        values.leaveTimeId = undefined;

        if (returnMoveType == MoveType.Other) {
          // tự túc
          values.returnPlaneCode = '';
          // thêm field
          values.carBookingType = '';
        }
      } else {
        // with CTN
        values.otherLeaveAddress = '';
        values.otherLeaveTime = '';
        values.returnPlaneCode = '';
        // thêm field
        values.carBookingType = '';
      }
      dispatch(
        fillForm({
          register: { ...register, ...values },
        }),
      );
      mapTitle(values);
      nextStep();
    },
  });

  const { returnMoveType } = formik.values;

  // thời gian khởi hành theo địa điểm xuất phát
  const { leaveAddressId } = formik.values;

  const [leaveTimes, setLeaveTimes] = useState<(LeaveTimeDto | undefined)[] | never[]>();

  useEffect(() => {
    const times = leaveAddresses
      ?.map((address) => {
        const newAddress = { ...address } as LeaveAddressDto;
        newAddress.times = address.times?.map((time) => {
          const newTime = { ...time };
          newTime.name = `${time.name} tại ${address.name}`;
          return newTime;
        });
        return newAddress || [];
      })
      .flatMap((address) => address.times)
      .sort((t1, t2) => new Date(t1?.time || '').getTime() - new Date(t2?.time || '').getTime());
    setLeaveTimes(times);
  }, [leaveAddresses]);

  useEffect(() => {
    formik.setTouched({});
  }, [returnMoveType]);

  const mapTitle = (values) => {
    function filterTitle(array, id) {
      return _.get(
        _.find(array, (a) => a.id == id),
        'name',
        '',
      );
    }
    dispatch(
      fillDataPreview({
        ...values,
        leaveAddressId: `${filterTitle(leaveAddresses, values.leaveAddressId)}`,
        leaveTimeId: `${filterTitle(leaveTimes, values.leaveTimeId)}`,
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
          Lịch trình
        </Heading>
        <Text color={'gray.500'} fontSize={{ base: 'sm', sm: 'md' }}>
          PL.2565 - DL.2022
        </Text>
      </Stack>
      <Box mt={10}>
        <FormikProvider value={formik}>
          <Form noValidate>
            <Stack spacing={4}>
              <Radios label='Về lại địa phương' name='returnMoveType'>
                {hasLeaveAddress && (
                  <Radio value={MoveType.WithCTN}>{MoveType.toString(MoveType.WithCTN)}</Radio>
                )}
                {canMoveByPlane && (
                  <Radio value={MoveType.ByPlane}>{MoveType.toString(MoveType.ByPlane)}</Radio>
                )}
                <Radio value={MoveType.Other}>{MoveType.toString(MoveType.Other)}</Radio>
              </Radios>
              {returnMoveType == MoveType.WithCTN && hasLeaveAddress && (
                // WithCTN
                <>
                  {/* <OurSelect
                    name='leaveAddressId'
                    options={leaveAddresses}
                    label='Địa điểm trở về'
                    placeholder='Địa điểm trở về'
                    optionValue='id'
                    optionLabel='name'
                    onChange={() => {
                      formik.setFieldValue('leaveTimeId', '');
                    }}
                  /> */}
                  <OurSelect
                    name='leaveTimeId'
                    options={leaveTimes}
                    label='Thời gian trở về'
                    placeholder='Thời gian trở về'
                    optionValue='id'
                    optionLabel='name'
                    isRequired
                  />
                </>
              )}
              {returnMoveType !== MoveType.WithCTN && (
                // tỉnh khác and tự túc
                <>
                  {/* <FloatingLabel name='otherLeaveAddress' label='Nơi trở về' /> */}
                  <DateTimePicker
                    name='otherLeaveTime'
                    label={returnMoveType === MoveType.ByPlane ? 'Ngày giờ bay về' : 'Ngày giờ về'}
                    isRequired
                  />
                  {canMoveByPlane && returnMoveType === MoveType.ByPlane && (
                    <>
                      <FloatingLabel name='returnPlaneCode' label='Mã chuyến bay - Giờ bay về' />
                      {/* thêm field */}
                      <Radios
                        spacing={2}
                        direction='column'
                        label={
                          <Text>
                            Đăng ký ô tô <Tag>HĐ thư ký sẽ xếp xe cho HĐ nếu đủ số lượng ạ</Tag>
                          </Text>
                        }
                        name='carBookingType'
                      >
                        <Radio value={CarBookingType.Both}>Cả 2 chiều</Radio>
                        <Radio value={CarBookingType.Go}>Chiều đi (Từ Tân Sơn Nhất về Chùa)</Radio>
                        <Radio value={CarBookingType.Return}>
                          Chiều về (Từ chùa ra Tân Sơn Nhất)
                        </Radio>
                        <Radio value={CarBookingType.ByYourSelf}>Tự túc</Radio>
                      </Radios>
                    </>
                  )}
                </>
              )}
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

export default Step3;
