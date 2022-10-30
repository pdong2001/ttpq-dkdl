import {
  FormControl,
  FormControlProps,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  InputProps,
  useColorModeValue,
} from '@chakra-ui/react';
import React from 'react';

type FloatingLabelProps = {
  label: string;
  helperText?: string;
  errorMessage?: string;
} & FormControlProps &
  InputProps;

const FloatingLabel = (props: FloatingLabelProps) => {
  const { label, errorMessage, helperText, value, name, ...rest } = props;
  return (
    <FormControl variant='floating' bg={useColorModeValue('gray.50', 'gray.900')} {...rest}>
      <Input name={name} focusBorderColor='ttpq.300' placeholder=' ' value={value} />
      {/* It is important that the Label comes after the Control due to css selectors */}
      <FormLabel bgColor={'inherit'}>{label}</FormLabel>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
      {errorMessage && <FormErrorMessage>{errorMessage}</FormErrorMessage>}
    </FormControl>
  );
};

export default FloatingLabel;
