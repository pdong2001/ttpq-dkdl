import { Box } from '@chakra-ui/react';
import { useEffect } from 'react';
import { APIRequest } from '~/apis/request/action';
import { useAppDispatch, useAppSelector } from '~/hooks/reduxHook';
import useAPIData from '~/hooks/useAPIData';
import DepartmentInfos from '../DeparmentInfos';

import GreatCeremonyInfo from '../GreatCeremonyInfo';
import MultiStepRegister from '../MultiStepRegister';
import Timeline from '../Timeline';

export default function Home() {
  const dispatch = useAppDispatch();
  const request = useAppSelector((state) => state.request);

  useEffect(() => {
    dispatch(
      APIRequest.post('/api/v1/Auth/login', {
        data: { Username: 'ToolDKDL', Password: 'ToolDKDL@1231@' },
      }),
    );
  }, []);
  useAPIData(request, {
    onFullfilled: (data) => console.log('success', data),
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
