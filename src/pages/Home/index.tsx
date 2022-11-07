import { Box } from '@chakra-ui/react';
import DepartmentInfos from '../DeparmentInfos';

import GreatCeremonyInfo from '../GreatCeremonyInfo';
import MultiStepRegister from '../MultiStepRegister';
import Timeline from '../Timeline';
import API from '~/apis/constants';
import useAxios from '~/hooks/useAxios';
import { useAppDispatch, useAppSelector } from '~/hooks/reduxHook';
import { useEffect } from 'react';
import { login } from '~/apis/auth/slice';
import useAPIData from '~/hooks/useAPIData';
export default function Home() {
  const { data, error, loading } = useAxios(
    {
      method: 'post',
      url: API.LOGIN,
      data: { username: 'ToolDKDL', password: 'ToolDKDL@1231@' },
    },
    (response) => response.data,
  );
  if (!loading) {
    console.log('use axios', data, error);
  }

  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);
  useEffect(() => {
    dispatch(login({ username: 'ToolDKDL', password: 'ToolDKDL@1231@' }));
  }, []);
  useAPIData(auth, {
    onFullfilled: (data1) => {
      console.log('success with redux', data1);
    },
    onRejected: (error1) => {
      console.log('error with redux', error1);
    },
    onPending: () => {
      console.log('loading...');
    },
  });
  return (
    <Box position={'relative'} w='full'>
      <MultiStepRegister />
      <GreatCeremonyInfo />
      <DepartmentInfos />
      <Timeline />
    </Box>
  );
}
