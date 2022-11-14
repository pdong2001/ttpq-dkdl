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
type Props = (InputProps & FormControlProps & { options?: Object[] }) & {
  tagColorScheme?: string;
  valueField?: string;
  labelField?: string;
  closeMenuOnSelect?: boolean;
};

const MultiSelect = (props: Props) => {
  const {
    name,
    tagColorScheme,
    options,
    label,
    isRequired,
    closeMenuOnSelect,
    valueField = 'value',
    labelField = 'label',
  } = props;
  const { primaryColor } = useCustomColorMode();
  const validOptions: MultiSelectOption[] =
    options?.map((option) => ({
      value: option[valueField],
      label: option[labelField],
    })) || [];
  //@ts-ignore
  const [field, { error, touched }, helpers] = useField(name);
  const isInvalid = !!error && touched;
  const value = field.value?.map((id) => validOptions[id]) || [];
  return (
    <FormControl isRequired={isRequired} isInvalid={isInvalid}>
      <FormLabel>{label}</FormLabel>
      <Select
        isMulti
        focusBorderColor={primaryColor}
        colorScheme={tagColorScheme}
        options={validOptions}
        name={field.name}
        value={value}
        closeMenuOnSelect={closeMenuOnSelect || true}
        onChange={(e) => {
          helpers.setValue(e.map((e) => e.value));
        }}
        onBlur={() => {
          helpers.setTouched(true);
        }}
      />
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
};

export default MultiSelect;
