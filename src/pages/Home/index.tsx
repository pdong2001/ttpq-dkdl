import { Box } from '@chakra-ui/react';
import { useEffect } from 'react';
import DepartmentInfos from '../DeparmentInfos';

import GreatCeremonyInfo from '../GreatCeremonyInfo';
import MultiStepRegister from '../MultiStepRegister';
import Timeline from '../Timeline';
import { useAppDispatch, useAppSelector } from '~/hooks/reduxHook';
import useAPIData from '~/hooks/useAPIData';
import { login, register } from '~/pages/MultiStepRegister/redux/slice';

export default function Home() {
  const dispatch = useAppDispatch();
  const registers = useAppSelector((state) => state.register);

  useEffect(() => {
    dispatch(login({ Username: 'ToolDKDL', Password: 'ToolDKDL@1231@' }));
    dispatch(register(null));
  }, [dispatch]);
  useAPIData(registers, {
    onFullfilled: (data) => {
      console.log('success', data);
    },
    onPending: () => {
      console.log('loading...');
    },
    onRejected: (error) => {
      console.log('error', error);
    },
  });
  return (
    <Box position={'relative'} w='full' minW={'sm'}>
      <MultiStepRegister />
      <GreatCeremonyInfo />
      <DepartmentInfos />
      <Timeline />
    </Box>
  );
}
