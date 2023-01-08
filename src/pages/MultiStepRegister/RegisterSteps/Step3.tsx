import { Stack, Heading, Button, Box, Text, Radio, SimpleGrid } from '@chakra-ui/react';
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
import step3Schema from '../validationSchema/step3_1';
import { MoveType } from '~/dtos/Enums/MoveType.enum';
import DateTimePicker from '~/components/Form/DatePicker';
import { LeaveTimeDto } from '~/dtos/TimeToLeaves/LeaveTimeDto.model';
import { StartTimeDto } from '~/dtos/StartTimes/StartTimeDto.model';
import { useRouteMatch } from 'react-router-dom';
import { convertToAppDateTime } from '~/utils/date';
import { StartAddressDto } from '~/dtos/Addresses/StartAddressDto.model';
import { LeaveAddressDto } from '~/dtos/LeaveAddresses/LeaveAddressDto.model';
import FadeInUp from '~/components/Animation/FadeInUp';
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
    moveType: editMoveType,
    startTimeId: editStartTimeId,
    otherStartAddress: editOtherStartAddress,
    otherStartTime: editOtherStartTime,
    startPlaneCode: editStartPlaneCode,
    startTime,
  } = useAppSelector((state) => state.registerInfo.data);
  const { addressId: editStartAddressId } = startTime || {};
  const {
    moveType: moveTypeInStore,
    startAddressId: startAddressIdInStore = '',

    startTimeId = '',

    startPlaneCode = '',
    otherStartTime = '',
    otherStartAddress = '',
  } = register || {};

  const hasStartAddress = !!startAddresses?.length;

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      moveType:
        moveTypeInStore ||
        (!!editMoveType && editMoveType + '') ||
        (hasStartAddress ? MoveType.WithCTN : MoveType.ByPlane) ||
        MoveType.Other,

      startAddressId: startAddressIdInStore || editStartAddressId,
      startTimeId: startTimeId || editStartTimeId,

      otherStartAddress: otherStartAddress || editOtherStartAddress,
      otherStartTime: otherStartTime || editOtherStartTime,
      startPlaneCode: startPlaneCode || editStartPlaneCode,
    },
    validationSchema: step3Schema,
    onSubmit: (values) => {
      if (moveType != MoveType.WithCTN) {
        // máy bay
        values.startAddressId = undefined;
        values.startTimeId = undefined;

        if (moveType == MoveType.Other) {
          // tự túc
          values.startPlaneCode = '';
        }
      } else {
        // with CTN
        values.otherStartAddress = '';
        values.otherStartTime = '';
        values.startPlaneCode = '';
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
  const { startAddressId } = formik.values;

  const [startTimes, setStartTimes] = useState<(StartTimeDto | undefined)[]>();

  useEffect(() => {
    const times = startAddresses
      ?.map((address) => {
        const newAddress = { ...address } as StartAddressDto;
        newAddress.times = address.times?.map((time) => {
          const newTime = { ...time };
          newTime.name = `${time.name} tại ${address.name}`;
          return newTime;
        });
        return newAddress || [];
      })
      .flatMap((address) => address.times);
    setStartTimes(times);
  }, [startAddresses]);

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
        startAddressId: `${filterTitle(startAddresses, values.startAddressId)}`,
        startTimeId: `${filterTitle(startTimes, values.startTimeId)}`,
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
                {!!startAddresses?.length && (
                  <Radio value={MoveType.WithCTN}>{MoveType.toString(MoveType.WithCTN)}</Radio>
                )}
                {canMoveByPlane && (
                  <Radio value={MoveType.ByPlane}>{MoveType.toString(MoveType.ByPlane)}</Radio>
                )}
                <Radio value={MoveType.Other}>{MoveType.toString(MoveType.Other)}</Radio>
              </Radios>
              {moveType == MoveType.WithCTN && (
                // WithCTN
                <>
                  {/* <OurSelect
                    name='startAddressId'
                    options={startAddresses}
                    label='Nơi xuất phát'
                    placeholder='Nơi xuất phát'
                    isRequired
                    onChange={() => {
                      formik.setFieldValue('startTimeId', '');
                    }}
                    optionValue='id'
                    optionLabel='name'
                  /> */}
                  <OurSelect
                    name='startTimeId'
                    options={startTimes}
                    label='Thời gian khởi hành'
                    placeholder='Thời gian khởi hành'
                    optionValue='id'
                    optionLabel='name'
                    isRequired
                  />
                </>
              )}
              {moveType !== MoveType.WithCTN && (
                // tỉnh khác and tự túc
                <>
                  <FloatingLabel name='otherStartAddress' label='Nơi xuất phát' isRequired />

                  <DateTimePicker name='otherStartTime' label='Ngày giờ đi' isRequired />
                  {canMoveByPlane && moveType === MoveType.ByPlane && (
                    <FloatingLabel name='startPlaneCode' label='Mã chuyến bay - Giờ bay đi' />
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
