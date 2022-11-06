import { Box } from '@chakra-ui/react';
import DepartmentInfos from '../DeparmentInfos';

import GreatCeremonyInfo from '../GreatCeremonyInfo';
import MultiStepRegister from '../MultiStepRegister';
import Timeline from '../Timeline';
import API from '~/apis/constants';
import HTTP from '~/apis/request';
import useAPIRequest from '~/hooks/useAPIRequest';
export default function Home() {
  const [response] = useAPIRequest({
    name: 'login',
    method: HTTP.post,
    config: {
      url: API.LOGIN,
      data: { username: 'ToolDKDL', password: 'ToolDKDL@1231@' },
    },
    handlers: {
      onFullfilled: () => {
        // console.log('data', data);
      },
    },
  });
  console.log('res', response);
  return (
    <Box position={'relative'} w='full' minW={'sm'}>
      <MultiStepRegister />
      <GreatCeremonyInfo />
      <DepartmentInfos />
      <Timeline />
    </Box>
  );
}
