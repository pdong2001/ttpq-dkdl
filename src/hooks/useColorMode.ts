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
  const bgCl = 'gray.50';
  const prCl = 'blue.500';
  const ftCl = 'gray.300';
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
