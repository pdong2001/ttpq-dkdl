import { Image, Link } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import Logos from '~/assets/logo.png';

type Props = {};

function Logo({}: Props) {
  const { shortUri = '' } = useParams<any>();

  return (
    <Link href={`/${shortUri}`} w={{ base: 10, md: 14 }}>
      <Image src={Logos} />
    </Link>
  );
}

export default Logo;
