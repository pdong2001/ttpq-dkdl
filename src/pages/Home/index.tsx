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

export default function Home() {
  const { data, error, loaded } = useAxios(
    {
      method: 'post',
      url: API.LOGIN,
      data: { username: 'ToolDKDL', password: 'ToolDKDL@1231@' },
      transformResponse: res => res.data
    }
  );
  if (loaded) {
    console.log('data', data, error);
  }

  const dispatch = useAppDispatch();
  const {
    data: reduxData,
    error: reduxError,
    loaded: reduxLoaded,
  } = useAppSelector((state) => state.auth);
  useEffect(() => {
    dispatch(login({ username: 'ToolDKDL', password: 'ToolDKDL@1231@' }));
  }, []);
  if (reduxLoaded) {
    console.log('redux data', reduxData, 'redux error', reduxError);
  }

  useAxios({
    method: 'post',
    url: `https://ctnpq.com/images/home/upload`,
    data: {
      fileImage: new File([""], "filename", { type: 'text/html' }),
      folder: "avatar"
    }
  },
  [], true)
  return (
    <Box position={'relative'} w='full'>
      <MultiStepRegister />
      <GreatCeremonyInfo />
      <DepartmentInfos />
      <Timeline />
    </Box>
  );
}
