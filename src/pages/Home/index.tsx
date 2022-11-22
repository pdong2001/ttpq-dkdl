import { Box } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import DepartmentInfos from '../DeparmentInfos';

import GreatCeremonyInfo from '../GreatCeremonyInfo';
import Timeline from '../Timeline';
import CaptionCarousel from '~/components/Hero/carousel';
import useAxios from '~/hooks/useAxios';

export default function Home() {
  const { shortUri } = useParams<any>();
  useAxios({
    method:  'get',
    url: '/images?key=ImageUpload/temporary/avatar/MjAyMg/MTA/Layout.png&scale=100'
  },[])
  return (
    <Box position={'relative'} w='full'>
      <CaptionCarousel />
      <GreatCeremonyInfo />
      <DepartmentInfos />
      <Timeline />
    </Box>
  );
}
