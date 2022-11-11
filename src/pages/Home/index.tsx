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
import { useParams } from 'react-router-dom';
import { getRegisterPage } from '~/apis/registerPage/slice';
import { formatUrl } from '~/utils/functions';

export default function Home() {
  const { shortUri } = useParams<any>();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (shortUri) {
      dispatch(
        getRegisterPage({
          method: 'get',
          url: formatUrl(API.GET_REGISTER_PAGE, { shortUri }),
        }),
      );
    }
  }, [shortUri]);

  const { data, loaded, error } = useAppSelector((state) => state.registerPage);
  if (loaded) {
    console.log('data, error', data, error);
  }
  const {
    data: reduxData,
    error: reduxError,
    loaded: reduxLoaded,
  } = useAppSelector((state) => state.auth);
  useEffect(() => {
    dispatch(
      login({
        data: { username: 'ToolDKDL', password: 'ToolDKDL@1231@' },
      }),
    );
  }, []);
  if (reduxLoaded) {
    console.log('redux data', reduxData, 'redux error', reduxError);
  }

  useAxios(
    {
      method: 'post',
      url: `https://ctnpq.com/images/home/upload`,
      data: {
        fileImage: new File([''], 'filename', { type: 'text/html' }),
        folder: 'avatar',
      },
    },
    [],
    true,
  );
  return (
    <Box position={'relative'} w='full'>
      <MultiStepRegister />
      <GreatCeremonyInfo />
      <DepartmentInfos />
      <Timeline />
    </Box>
  );
}
