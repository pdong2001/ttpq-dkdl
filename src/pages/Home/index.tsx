import { Box } from '@chakra-ui/react';
import { useEffect } from 'react';
import DepartmentInfos from '../DeparmentInfos';

import GreatCeremonyInfo from '../GreatCeremonyInfo';
import MultiStepRegister from '../MultiStepRegister';
import Timeline from '../Timeline';
import { useAppDispatch } from '~/hooks/reduxHook';
import { login } from '~/pages/MultiStepRegister/redux/actions';

export default function Home() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(login({ Username: 'ToolDKDL', Password: 'ToolDKDL@1231@' }));
  }, [dispatch]);

  return (
    <Box position={'relative'} w='full' minW={'sm'}>
      <MultiStepRegister />
      <GreatCeremonyInfo />
      <DepartmentInfos />
      <Timeline />
    </Box>
  );
}
