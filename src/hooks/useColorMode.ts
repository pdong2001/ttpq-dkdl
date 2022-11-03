import { useColorModeValue } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

type ColorModeValue = string | undefined;
type ColorModeHook = () => {
  bgColor: ColorModeValue;
  primaryColor: ColorModeValue;
  formTextColor: ColorModeValue;
};

const useCustomColorMode: ColorModeHook = () => {
  const [bgColor, setBgColor] = useState<string>();
  const [formTextColor, setFormTextColor] = useState<string>();
  const [primaryColor, setPrimaryColor] = useState<string>();
  const bgCl = useColorModeValue('gray.50', 'gray.900');
  const prCl = useColorModeValue('ttpq.500', 'ttpq.200');
  const ftCl = useColorModeValue('gray.500', 'gray.200');
  useEffect(() => {
    // @ts-ignore
    setBgColor(bgCl);
    // @ts-ignore
    setPrimaryColor(prCl);
    //@ts-ignore
    setFormTextColor(ftCl);
  }, [bgCl, prCl, ftCl]);
  return { bgColor, primaryColor, formTextColor };
};

export default useCustomColorMode;
