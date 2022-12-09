import { Stack, Heading, Button, Box, Text, Radio, SimpleGrid } from '@chakra-ui/react';
import _ from 'lodash';
import useCustomColorMode from '~/hooks/useColorMode';
import { StepProps } from '..';
import Select from '~/components/Form/CustomSelect';
import { Form, FormikProvider, useFormik } from 'formik';
import Radios from '~/components/Form/Radios';
import { fillDataPreview } from '~/slices/previewInfo';
import FloatingLabel from '~/components/Form/FloatingLabel/FloatingLabel';
import { useAppDispatch, useAppSelector } from '~/hooks/reduxHook';
import { useEffect, useState } from 'react';
import { fillForm } from '../../../slices/register';
import step3Schema from '../validationSchema/step3';
import { MoveType } from '~/dtos/Enums/MoveType.enum';
import DateTimePicker from '~/components/Form/DatePicker';
import { LeaveTimeDto } from '~/dtos/TimeToLeaves/LeaveTimeDto.model';
import { StartTimeDto } from '~/dtos/StartTimes/StartTimeDto.model';
import { MOVE_TYPE_TITLE } from '~/configs/register';
import { useRouteMatch } from 'react-router-dom';
import { ADD_NEW_REGISTER_PATH } from '~/routes';
import { convertToAppDateTime } from '~/utils/date';
import { StartAddressDto } from '~/dtos/Addresses/StartAddressDto.model';
import { LeaveAddressDto } from '~/dtos/LeaveAddresses/LeaveAddressDto.model';
import FadeInUp from '~/components/Animation/FadeInUp';
import { CarBookingType } from '~/dtos/Enums/CarBookingType.enum';

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
  const { leaveAddresses, startAddresses } = registerPage;

  const { register } = useAppSelector((state) => state.register.data);
  const {
    moveType: editMoveType,
    startTimeId: editStartTimeId,
    leaveTimeId: editLeaveTimeId,
    otherStartAddress: editOtherStartAddress,
    otherStartTime: editOtherStartTime,
    otherLeaveTime: editOtherLeaveTime,
    startPlaneCode: editStartPlaneCode,
    returnPlaneCode: editReturnPlaneCode,
    leaveTime,
    startTime,
    //thêm field
    carBookingType: editCarBookingType,
  } = useAppSelector((state) => state.registerInfo.data);
  const { addressId: editStartAddressId } = startTime || {};
  const { addressId: editLeaveAddressId } = leaveTime || {};
  const {
    moveType: moveTypeInStore,
    startAddressId: startAddressIdInStore = '',
    leaveAddressId: leaveAddressIdInStore = '',

    startTimeId = '',
    leaveTimeId: leaveTimeIdInStore = '',

    startPlaneCode = '',
    returnPlaneCode = '',
    otherLeaveTime = '',
    otherStartTime = '',
    otherStartAddress = '',
    // thêm field
    carBookingType: carBookingTypeInStore,
  } = register || {};

  const hasStartAddress = !!startAddresses?.length;
  const isAddNew = path === ADD_NEW_REGISTER_PATH;

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      moveType:
        moveTypeInStore ||
        (editMoveType && editMoveType + '') ||
        (hasStartAddress ? MoveType.WithCTN : MoveType.Other),

      startAddressId: startAddressIdInStore || editStartAddressId,
      startTimeId: startTimeId || editStartTimeId,
      leaveAddressId: leaveAddressIdInStore || editLeaveAddressId,
      leaveTimeId: leaveTimeIdInStore || editLeaveTimeId,

      otherStartAddress: otherStartAddress || editOtherStartAddress,
      otherStartTime: otherStartTime || editOtherStartTime,
      otherLeaveTime: otherLeaveTime || editOtherLeaveTime,
      startPlaneCode: startPlaneCode || editStartPlaneCode,
      returnPlaneCode: returnPlaneCode || editReturnPlaneCode,
      // thêm field
      carBookingType:
        carBookingTypeInStore ||
        (editCarBookingType && editCarBookingType + '') ||
        CarBookingType.Both,
    },
    validationSchema: step3Schema,
    onSubmit: (values) => {
      if (moveType != MoveType.WithCTN) {
        // máy bay
        values.startAddressId = undefined;
        values.startTimeId = undefined;
        values.leaveAddressId = undefined;
        values.leaveTimeId = undefined;

        if (moveType == MoveType.Other) {
          // tự túc
          values.startPlaneCode = '';
          values.returnPlaneCode = '';
          // thêm field
          values.carBookingType = '';
        }
      } else {
        // with CTN
        values.otherStartAddress = '';
        values.otherStartTime = '';
        values.otherLeaveTime = '';
        values.startPlaneCode = '';
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

  const { moveType } = formik.values;

  // thời gian khởi hành theo địa điểm xuất phát
  const { startAddressId, leaveAddressId } = formik.values;

  const [leaveTimes, setLeaveTimes] = useState<Time[] | never[]>();
  const [startTimes, setStartTimes] = useState<Time[] | never[]>();

  useEffect(() => {
    const times = leaveAddresses?.find((address) => address.id == leaveAddressId)?.times || [];
    const mappingTimes = mappingTime(times);
    setLeaveTimes(mappingTimes);
  }, [leaveAddresses, leaveAddressId]);

  useEffect(() => {
    const times = startAddresses?.find((address) => address.id == startAddressId)?.times || [];
    const mappingTimes = mappingTime(times);
    setStartTimes(mappingTimes);
  }, [startAddresses, startAddressId]);

  useEffect(() => {
    formik.setTouched({});
  }, [moveType]);

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
        startAddressId: `${filterTitle(mappingAddress(startAddresses), values.startAddressId)}`,
        leaveAddressId: `${filterTitle(mappingAddress(leaveAddresses), values.leaveAddressId)}`,
        startTimeId: `${filterTitle(startTimes, values.startTimeId)}`,
        leaveTimeId: `${filterTitle(leaveTimes, values.leaveTimeId)}`,
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
              <Radios label='Hình thức di chuyển' name='moveType'>
                {startAddresses?.length && (
                  <Radio value={MoveType.WithCTN}>{MOVE_TYPE_TITLE[MoveType.WithCTN]}</Radio>
                )}
                <Radio value={MoveType.ByPlane}>{MOVE_TYPE_TITLE[MoveType.ByPlane]}</Radio>
                <Radio value={MoveType.Other}>{MOVE_TYPE_TITLE[MoveType.Other]}</Radio>
              </Radios>
              {moveType == MoveType.WithCTN && (
                // WithCTN
                <>
                  <Select
                    name='startAddressId'
                    data={mappingAddress(startAddresses)}
                    label='Nơi xuất phát'
                    placeholder='Nơi xuất phát'
                    isRequired
                    onChange={() => {
                      formik.setFieldValue('startTimeId', '');
                    }}
                  />
                  <Select
                    name='startTimeId'
                    data={startTimes}
                    label='Thời gian khởi hành'
                    placeholder='Thời gian khởi hành'
                    isRequired
                  />
                  <Select
                    name='leaveAddressId'
                    data={mappingAddress(leaveAddresses)}
                    label='Địa điểm trở về'
                    placeholder='Địa điểm trở về'
                    onChange={() => {
                      formik.setFieldValue('leaveTimeId', '');
                    }}
                  />
                  <Select
                    name='leaveTimeId'
                    data={leaveTimes}
                    label='Thời gian trở về'
                    placeholder='Thời gian trở về'
                  />
                </>
              )}
              {moveType !== MoveType.WithCTN && (
                // tỉnh khác and tự túc
                <>
                  <FloatingLabel name='otherStartAddress' label='Nơi xuất phát' isRequired />
                  <DateTimePicker name='otherStartTime' label='Ngày giờ đi' isRequired />
                  {moveType === MoveType.ByPlane && (
                    <FloatingLabel name='startPlaneCode' label='Mã chuyến bay - Giờ bay đi' />
                  )}
                  <DateTimePicker name='otherLeaveTime' label='Ngày giờ về' isRequired />
                  {moveType === MoveType.ByPlane && (
                    <>
                      <FloatingLabel name='returnPlaneCode' label='Mã chuyến bay - Giờ bay về' />
                      {/* thêm field */}
                      <Radios
                        spacing={2}
                        direction='column'
                        label='Đăng ký ô tô'
                        name='carBookingType'
                        isRequired
                      >
                        <Radio value={CarBookingType.Go}>Chiều đi (Từ Tân Sơn Nhất về Chùa)</Radio>
                        <Radio value={CarBookingType.Return}>
                          Chiều về (Từ chùa ra Tân Sơn Nhất)
                        </Radio>
                        <Radio value={CarBookingType.Both}>Cả 2 chiều</Radio>
                      </Radios>
                    </>
                  )}
                </>
              )}
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

export default Step3;
