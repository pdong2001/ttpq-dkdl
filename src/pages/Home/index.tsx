import { Box } from '@chakra-ui/react';
import DepartmentInfos from '../DeparmentInfos';

import GreatCeremonyInfo from '../GreatCeremonyInfo';
import MultiStepRegister from '../MultiStepRegister';
import Timeline from '../Timeline';
import API from '~/apis/constants';
import HTTP from '~/apis/request';
import useAPIRequest from '~/hooks/useAPIRequest';
export default function Home() {
  useAPIRequest({
    name: 'login',
    method: HTTP.post,
    config: {
      url: API.LOGIN,
      data: { username: 'ToolDKDL', password: 'ToolDKDL@1231@' },
    },
    handlers: {
      onFullfilled: (data) => {
        console.log('data', data);
      },
      onRejected: (error) => {
        console.log('error', error);
      },
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
