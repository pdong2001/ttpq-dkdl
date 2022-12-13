import { useRadio, UseRadioProps, Box, BoxProps, Button } from '@chakra-ui/react';
import { ReactNode } from 'react';

type Props = { children: ReactNode } & UseRadioProps & BoxProps;

const RadioCard = (props: Props) => {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as='label' w={props.w}>
      <input {...input} />
      <Box
        {...checkbox}
        cursor='pointer'
        borderWidth='1px'
        borderRadius='md'
        boxShadow='md'
        _checked={{
          bg: 'blue.500',
          color: 'white',
          borderColor: 'blue.500',
        }}
        _focus={{
          outline: 'none',
        }}
        px={4}
        py={2}
        textAlign='center'
      >
        {props.children}
      </Box>
    </Box>
  );
};

export default RadioCard;
