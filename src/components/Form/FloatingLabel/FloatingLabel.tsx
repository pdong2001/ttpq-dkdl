import {
  FormControl,
  FormControlProps,
  FormErrorMessage,
  FormLabel,
  Input,
  InputProps,
} from '@chakra-ui/react';
import { useField } from 'formik';
import useCustomColorMode from '~/hooks/useColorMode';

type FloatingLabelProps = {
  label: string;
  helperText?: string;
  errorMessage?: string;
} & FormControlProps &
  InputProps;

const FloatingLabel = (props: FloatingLabelProps) => {
  const { label, name, defaultValue, ...rest } = props;
  const { bgColor, primaryColor } = useCustomColorMode();
  // @ts-ignore
  const [field, meta] = useField(name);
  field.value ??= defaultValue; // set default value on props

  return (
    <FormControl variant='floating' isInvalid={!!meta.error && meta.touched} {...rest}>
      <Input focusBorderColor={primaryColor} placeholder=' ' {...field} {...props} />
      {/* It is important that the Label comes after the Control due to css selectors */}
      <FormLabel bgColor={bgColor}>{label}</FormLabel>
      {meta.error && <FormErrorMessage>{meta.error}</FormErrorMessage>}
    </FormControl>
  );
};

FloatingLabel.defaultProps = { autoComplete: 'off' } as FloatingLabelProps;

export default FloatingLabel;
