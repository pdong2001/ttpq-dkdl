import { Image, Link } from '@chakra-ui/react';
import Logos from '~/assets/logo.png';

type Props = {};

function Logo({}: Props) {
  return (
    <Link href='/' w={{ base: 10, md: 14 }}>
      <Image src={Logos} />
    </Link>
  );
}

export default Logo;
