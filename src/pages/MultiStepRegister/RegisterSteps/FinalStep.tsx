import { Circle } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import useCustomColorMode from '~/hooks/useColorMode';

const FinalStep = () => {
  const { primaryColor, bgColor } = useCustomColorMode();
  const history = useHistory();
  return (
    <Circle
      cursor='pointer'
      fontSize={'3xl'}
      bg={bgColor}
      color={primaryColor}
      onClick={() => history.go(0)}
    >
      FinalStep
    </Circle>
  );
};

export default FinalStep;
