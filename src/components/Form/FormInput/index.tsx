import {
  FormControl,
  FormControlProps,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  InputProps,
} from '@chakra-ui/react';
import { useField } from 'formik';
import { useEffect, useRef } from 'react';
import useCustomColorMode from '~/hooks/useColorMode';

type FormInputProps = {
  label: string;
  helperText?: string;
  errorMessage?: string;
  hiddenErrorMessage?: boolean;
  inputMode?: string;
} & FormControlProps &
  InputProps;

const FormInput = (props: FormInputProps) => {
  const {
    label,
    name,
    defaultValue,
    hiddenErrorMessage,
    as: Component = Input,
    color,
    helperText,
  } = props;
  const { primaryColor } = useCustomColorMode();
  // @ts-ignore
  const [field, meta] = useField(name);
  field.value ??= defaultValue; // set default value on props

  const inputRef = useRef<HTMLElement>();
  const isInvalid = !!meta.error && meta.touched;
  useEffect(() => {
    if (isInvalid && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isInvalid]);
  return (
    <FormControl isInvalid={!!meta.error && meta.touched} {...{ color }}>
      <FormLabel tabIndex={-1}>{label}</FormLabel>
      <Component focusBorderColor={primaryColor} placeholder=' ' {...field} {...{ name }} />
      <FormHelperText>{helperText}</FormHelperText>
      {!hiddenErrorMessage && meta.error && <FormErrorMessage>{meta.error}</FormErrorMessage>}
    </FormControl>
  );
};

FormInput.defaultProps = { autoComplete: 'off' } as FormInputProps;

export default FormInput;
