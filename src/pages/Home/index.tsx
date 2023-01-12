import { Box } from '@chakra-ui/react';
import DepartmentInfos from '../DeparmentInfos';

import GreatCeremonyInfo from '../GreatCeremonyInfo';
import Timeline from '../Timeline';
import CaptionCarousel from '~/components/Hero/carousel';
import { useAppSelector } from '~/hooks/reduxHook';

export default function Home() {
  const { event } = useAppSelector((state) => state.registerPage.data);
  const { enableTimeLine } = event || {};

  return (
    <Box position={'relative'} w='full'>
      <CaptionCarousel />
      <GreatCeremonyInfo />
      <DepartmentInfos />
      {enableTimeLine && <Timeline />}
    </Box>
  );
}
