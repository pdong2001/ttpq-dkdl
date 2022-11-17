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
  const {
    data,
    hiddenErrorMessage,
    valueField,
    labelField,
    label,
    name,
    isRequired,
    onChange,
    ...rest
  } = props;
  const { formTextColor } = useCustomColorMode();

  // @ts-ignore
  const [{ onChange: fieldChange, ...restField }, meta] = useField(props.name);
  const { primaryColor } = useCustomColorMode();
  const customChange = (e) => {
    fieldChange(e);
    onChange && onChange(e);
  };

  return (
    <FormControl isRequired={isRequired} isInvalid={!!meta.error && meta.touched}>
      <FormLabel color={formTextColor}>{label}</FormLabel>
      <Select
        onChange={customChange}
        {...restField}
        {...rest}
        name={name}
        focusBorderColor={primaryColor}
      >
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
