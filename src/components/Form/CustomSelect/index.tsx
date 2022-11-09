import { FormControl, FormErrorMessage, FormLabel, Select, SelectProps } from '@chakra-ui/react';
import { useField } from 'formik';
import useCustomColorMode from '~/hooks/useColorMode';

export type SelectData = {
  id: number | string;
};

type CustomSelectProps = {
  data: SelectData[];
  label?: string;
  hiddenErrorMessage?: boolean;
  valueField: string;
  labelField: string;
} & SelectProps;

const CustomSelect = (props: CustomSelectProps) => {
  const { data, label, name, isRequired, hiddenErrorMessage, valueField, labelField } = props;
  const { formTextColor } = useCustomColorMode();

  // @ts-ignore
  const [field, meta] = useField(props.name);
  const { primaryColor } = useCustomColorMode();

  return (
    <FormControl isRequired={isRequired} isInvalid={!!meta.error && meta.touched}>
      <FormLabel color={formTextColor}>{label}</FormLabel>
      <Select {...field} {...props} name={name} focusBorderColor={primaryColor}>
        {data?.map((item) => (
          <option key={item.id} value={item[valueField]}>
            {item[labelField]}
          </option>
        ))}
      </Select>
      {!hiddenErrorMessage && meta.error && <FormErrorMessage>{meta.error}</FormErrorMessage>}
    </FormControl>
  );
};

CustomSelect.defaultProps = {
  labelField: 'name',
  valueField: 'id',
} as CustomSelectProps;

export default CustomSelect;
