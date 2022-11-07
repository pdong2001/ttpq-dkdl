import { Box } from '@chakra-ui/react';
import DepartmentInfos from '../DeparmentInfos';

import GreatCeremonyInfo from '../GreatCeremonyInfo';
import MultiStepRegister from '../MultiStepRegister';
import Timeline from '../Timeline';
import API from '~/apis/constants';
import useAxios from '~/hooks/useAxios';
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
    console.log('test common api', data, error);
  }

  return (
    <Box position={'relative'} w='full' minW={'sm'}>
      <MultiStepRegister />
      <GreatCeremonyInfo />
      <DepartmentInfos />
      <Timeline />
    </Box>
  );
}
