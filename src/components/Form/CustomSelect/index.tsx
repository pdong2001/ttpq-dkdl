import { FormControl, FormErrorMessage, FormLabel, Select, SelectProps } from '@chakra-ui/react';
import { nanoid } from '@reduxjs/toolkit';
import { useField } from 'formik';
import useCustomColorMode from '~/hooks/useColorMode';

export type SelectData = {
  id: string | number;
};

type CustomSelectProps = {
  data?: SelectData[];
  label?: string;
  hiddenErrorMessage?: boolean;
  valueField: string;
  labelField: string;
} & SelectProps;

const CustomSelect = (props: CustomSelectProps) => {
  const { data, hiddenErrorMessage, valueField, labelField, label, name, isRequired, ...rest } =
    props;
  const { formTextColor } = useCustomColorMode();

  // @ts-ignore
  const [field, meta] = useField(props.name);
  const { primaryColor } = useCustomColorMode();

  return (
    <FormControl isRequired={isRequired} isInvalid={!!meta.error && meta.touched}>
      <FormLabel color={formTextColor}>{label}</FormLabel>
      <Select {...field} {...rest} name={name} focusBorderColor={primaryColor}>
        {data?.map((item) => (
          <option key={nanoid()} value={item[valueField]}>
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
