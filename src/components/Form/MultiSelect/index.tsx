import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormControlProps,
  InputProps,
} from '@chakra-ui/react';
import { Select } from 'chakra-react-select';
import { useField } from 'formik';
import useCustomColorMode from '~/hooks/useColorMode';

type MultiSelectOption = {
  label: string;
  value: any;
  colorScheme?: string;
};
type Props = InputProps &
  FormControlProps & {
    tagColorScheme?: string;
    optionLabel?: string;
    optionValue?: string;
    closeMenuOnSelect?: boolean;
    isMulti?: boolean;
    hiddenErrorMessage?: boolean;
  } & { options?: Record<string, any> };

const OurSelect = (props: Props) => {
  const {
    name,
    tagColorScheme,
    options,
    label,
    isRequired,
    closeMenuOnSelect,
    optionLabel = 'label',
    optionValue = 'value',
    isMulti,
    hiddenErrorMessage,
    placeholder,
  } = props;
  const { primaryColor } = useCustomColorMode();
  const validOptions: MultiSelectOption[] =
    options?.map((option: any) => ({
      value: option[optionValue],
      label: option[optionLabel],
    })) || [];
  //@ts-ignore
  const [field, { error, touched }, helpers] = useField(name);
  const isInvalid = !!error && touched;
  const value = isMulti
    ? validOptions.filter((item) => field.value?.includes?.(item.value))
    : validOptions.find((item) => field.value === item.value);

  return (
    <FormControl isRequired={isRequired} isInvalid={isInvalid}>
      <FormLabel>{label}</FormLabel>
      <Select
        placeholder={placeholder}
        isMulti={isMulti}
        focusBorderColor={primaryColor}
        colorScheme={tagColorScheme}
        options={validOptions}
        name={field.name}
        value={value}
        closeMenuOnSelect={closeMenuOnSelect ?? true}
        onChange={(e) => {
          console.log(name, 'change');

          if (isMulti) {
            helpers.setValue(e?.map((item) => item.value));
          } else {
            helpers.setValue(e.value);
          }
        }}
        onBlur={() => {
          helpers.setTouched(true);
        }}
      />
      {!hiddenErrorMessage && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};

export default OurSelect;
