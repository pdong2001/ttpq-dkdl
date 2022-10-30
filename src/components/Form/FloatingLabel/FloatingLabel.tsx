import {
  FormControl,
  FormControlProps,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  InputProps,
} from '@chakra-ui/react';
import useCustomColorMode from '~/hooks/useColorMode';

type FloatingLabelProps = {
  label: string;
  helperText?: string;
  errorMessage?: string;
} & FormControlProps &
  InputProps;

const FloatingLabel = (props: FloatingLabelProps) => {
  const { label, errorMessage, helperText, value, name, ...rest } = props;
  const { bgColor } = useCustomColorMode();
  return (
    <FormControl variant='floating' {...rest}>
      <Input name={name} focusBorderColor='ttpq.300' placeholder=' ' value={value} />
      {/* It is important that the Label comes after the Control due to css selectors */}
      <FormLabel bgColor={bgColor}>{label}</FormLabel>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
      {errorMessage && <FormErrorMessage>{errorMessage}</FormErrorMessage>}
    </FormControl>
  );
};

export default FloatingLabel;
