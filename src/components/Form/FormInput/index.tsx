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

type FormInputProps = {
  label: string;
  helperText?: string;
  errorMessage?: string;
  hiddenErrorMessage?: boolean;
  inputmode?: string;
} & FormControlProps &
  InputProps;

const FormInput = (props: FormInputProps) => {
  const { label, name, defaultValue, hiddenErrorMessage, as: Component = Input, color } = props;
  const { primaryColor } = useCustomColorMode();
  // @ts-ignore
  const [field, meta] = useField(name);
  field.value ??= defaultValue; // set default value on props

  return (
    <FormControl isInvalid={!!meta.error && meta.touched} {...{ color }}>
      <FormLabel tabIndex={-1}>{label}</FormLabel>
      <Component focusBorderColor={primaryColor} placeholder=' ' {...field} {...{ name }} />
      {!hiddenErrorMessage && meta.error && <FormErrorMessage>{meta.error}</FormErrorMessage>}
    </FormControl>
  );
};

FormInput.defaultProps = { autoComplete: 'off' } as FormInputProps;

export default FormInput;
