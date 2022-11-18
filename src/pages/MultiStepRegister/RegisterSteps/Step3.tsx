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
import useAxios from '~/hooks/useAxios';
import API from '~/apis/constants';
import { formatUrl } from '~/utils/functions';
import { useEffect, useState } from 'react';
import { fillForm } from '../../../slices/register';
import step3Schema from '../validationSchema/step3';
import { MoveType } from '~/dtos/Enums/MoveType.enum';
import DateTimePicker from '~/components/Form/DatePicker';
import { LeaveTimeDto } from '~/dtos/TimeToLeaves/LeaveTimeDto.model';
import { StartTimeDto } from '~/dtos/StartTimes/StartTimeDto.model';

const Step3 = (props: StepProps) => {
  const { nextStep, previousStep } = props;
  const { primaryColor, formTextColor } = useCustomColorMode();
  const dispatch = useAppDispatch();
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
  } = useAppSelector((state) => state.registerInfo.data);
  const { eventId } = useAppSelector((state) => state.registerPage.data);
  const {
    moveType: moveTypeInStore = MoveType.HCM,
    startAddressId: startAddressIdInStore = '',
    startTimeId = '',
    leaveTimeId: leaveTimeIdInStore = '',
    startPlaneCode = '',
    returnPlaneCode = '',
    otherLeaveTime = '',
    otherStartTime = '',
    otherStartAddress = '',
    leaveAddressId: leaveAddressIdInStore = '',
  } = register;

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      moveType: moveTypeInStore || editMoveType + '',

      startAddressId: startAddressIdInStore || editStartTimeId,
      startTimeId: startTimeId || editStartTimeId,
      leaveAddressId: leaveAddressIdInStore || editLeaveTimeId,
      leaveTimeId: leaveTimeIdInStore || editLeaveTimeId,

      otherStartAddress: otherStartAddress || editOtherStartAddress,
      otherStartTime: otherStartTime || (editOtherStartTime && new Date(editOtherStartTime)),
      otherLeaveTime: otherLeaveTime || (editOtherLeaveTime && new Date(editOtherLeaveTime)),
      startPlaneCode: startPlaneCode || editStartPlaneCode,
      returnPlaneCode: returnPlaneCode || editReturnPlaneCode,
    },
    validationSchema: step3Schema,
    onSubmit: (values) => {
      if (moveType != MoveType.HCM) {
        values.startAddressId = undefined;
        values.startTimeId = undefined;
        values.leaveAddressId = undefined;
        values.leaveTimeId = undefined;
        if (moveType == MoveType.BY_YOUR_SELF) {
          values.startPlaneCode = '';
          values.returnPlaneCode = '';
        }
      } else {
        values.otherStartAddress = '';
        values.otherStartTime = '';
        values.otherLeaveTime = '';
        values.startPlaneCode = '';
        values.returnPlaneCode = '';
      }
      dispatch(fillDataPreview({ ...values }));
      dispatch(
        fillForm({
          register: { ...register, ...values },
        }),
      );
      mapTitle();
      nextStep();
    },
  });

  const { moveType } = formik.values;
  let { data: registerPage } = useAppSelector((state) => state.registerPage);
  const { leaveAddresses, startAddresses } = registerPage;

  // địa điểm xuất phát
  const { data: startAddressList } = useAxios(
    {
      method: 'get',
      url: formatUrl(API.GET_START_ADDRESS_BY_EVENT, { id: eventId }),
      transformResponse: ({ data }) => data,
    },
    [],
  );

  const HCMAddressList = startAddressList?.filter((item) => item.provinceId === 1);

  // thời gian khởi hành theo địa điểm xuất phát
  const { startAddressId, leaveAddressId } = formik.values;

  const [leaveTimes, setLeaveTimes] = useState<LeaveTimeDto[] | never[]>();
  const [startTimes, setStartTimes] = useState<StartTimeDto[] | never[]>();

  useEffect(() => {
    const times = leaveAddresses?.find((address) => address.id == leaveAddressId)?.times || [];
    setLeaveTimes(times);
  }, [leaveAddresses, leaveAddressId]);

  useEffect(() => {
    const times = startAddresses?.find((address) => address.id == startAddressId)?.times || [];
    console.log('times', times, startAddresses, startAddressId);

    setStartTimes(times);
  }, [startAddresses, startAddressId]);

  useEffect(() => {
    formik.setTouched({});
  }, [moveType]);

  const mapTitle = () => {
    function filterTitle(array, id) {
      return _.get(_.filter(array, (a) => a.id == id)[0], 'name', '');
    }
    dispatch(
      fillDataPreview({
        time: {
          startAddress: `${filterTitle(HCMAddressList, startAddressId)}`,
          startTime: `${filterTitle(startTimes, startTimeId)}`,
          leaveTime: `${filterTitle(leaveTimes, leaveTimeIdInStore)}`,
        },
      }),
    );
  };
  console.log('___', formik.values);

  return (
    <>
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
              <Radios isRequired label='Hình thức di chuyển' name='moveType'>
                {startAddresses?.length && <Radio value={MoveType.HCM}>Đi cùng xe CTN</Radio>}
                <Radio value={MoveType.OTHER}>Máy bay</Radio>
                <Radio value={MoveType.BY_YOUR_SELF}>Tự túc</Radio>
              </Radios>
              {moveType == MoveType.HCM && (
                // HCM
                <>
                  <Select
                    name='startAddressId'
                    data={startAddresses}
                    label='Nơi xuất phát'
                    placeholder='Nơi xuất phát'
                    isRequired
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
                    data={leaveAddresses}
                    label='Địa điểm trở về'
                    placeholder='Địa điểm trở về'
                    isRequired
                  />
                  <Select
                    name='leaveTimeId'
                    data={leaveTimes}
                    label='Thời gian trở về'
                    placeholder='Thời gian trở về'
                    isRequired
                  />
                </>
              )}
              {moveType !== MoveType.HCM && (
                // tỉnh khác and tự túc
                <>
                  <FloatingLabel
                    name='otherStartAddress'
                    label='Nơi xuất phát'
                    color={formTextColor}
                    isRequired
                  />
                  <DateTimePicker name='otherStartTime' label='Ngày giờ đi' isRequired />
                  {moveType === MoveType.OTHER && (
                    <FloatingLabel
                      name='startPlaneCode'
                      label='Mã chuyến bay - Giờ bay đi'
                      color={formTextColor}
                    />
                  )}
                  <DateTimePicker name='otherLeaveTime' label='Ngày giờ về' isRequired />
                  {moveType === MoveType.OTHER && (
                    <FloatingLabel
                      name='returnPlaneCode'
                      label='Mã chuyến bay - Giờ bay về'
                      color={formTextColor}
                    />
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
    </>
  );
};

export default Step3;
