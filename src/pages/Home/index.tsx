import { Box } from '@chakra-ui/react';
import DepartmentInfos from '../DeparmentInfos';

import GreatCeremonyInfo from '../GreatCeremonyInfo';
import MultiStepRegister from '../MultiStepRegister';
import Timeline from '../Timeline';
import API from '~/apis/constants';
import useAxios from '~/hooks/useAxios';
import Loading from '~/components/Loading';
export default function Home() {
  const { data, error, loading } = useAxios({
    method: 'post',
    url: API.LOGIN,
    data: { username: 'ToolDKDL', password: 'ToolDKDL@1231@' },
  });
  if (!loading) {
    console.log('error login', error?.code, error?.message, data);
  }

  return (
    <Box position={'relative'} w='full' minW={'sm'}>
      <MultiStepRegister />
      <GreatCeremonyInfo />
      <DepartmentInfos />
      <Timeline />
      <Loading />
    </Box>
  );
}
