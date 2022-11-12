import { Box } from '@chakra-ui/react';
import DepartmentInfos from '../DeparmentInfos';

import GreatCeremonyInfo from '../GreatCeremonyInfo';
import MultiStepRegister from '../MultiStepRegister';
import Timeline from '../Timeline';
import API from '~/apis/constants';
import { useAppDispatch, useAppSelector } from '~/hooks/reduxHook';
import { useEffect } from 'react';
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

  // useAxios(
  //   {
  //     method: 'post',
  //     url: `/images/home/upload`,
  //     data: {
  //       fileImage: new File([''], 'filename', { type: 'text/html' }),
  //       folder: 'avatar',
  //     },
  //   },
  //   [],
  // );
  return (
    <Box position={'relative'} w='full'>
      <MultiStepRegister />
      <GreatCeremonyInfo />
      <DepartmentInfos />
      <Timeline />
    </Box>
  );
}
