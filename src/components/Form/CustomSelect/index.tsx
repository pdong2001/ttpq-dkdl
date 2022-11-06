import { FormControl, FormErrorMessage, FormLabel, Select, SelectProps } from '@chakra-ui/react';
import { useField } from 'formik';
import useCustomColorMode from '~/hooks/useColorMode';

export type SelectData = {
  id: number | string;
  name: string;
};

type CustomSelectProps = {
  data: SelectData[];
  label?: string;
  hiddenErrorMessage?: boolean;
} & SelectProps;

const CustomSelect = (props: CustomSelectProps) => {
  const { data, label, name, isRequired, hiddenErrorMessage } = props;
  const { formTextColor } = useCustomColorMode();

  // @ts-ignore
  const [field, meta] = useField(props.name);
  const { primaryColor } = useCustomColorMode();

  return (
    <FormControl as='fieldset' isRequired={isRequired} isInvalid={!!meta.error && meta.touched}>
      <FormLabel as='legend' color={formTextColor}>
        {label}
      </FormLabel>
      <Select {...field} {...props} name={name} focusBorderColor={primaryColor}>
        {data?.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </Select>
      {!hiddenErrorMessage && meta.error && <FormErrorMessage>{meta.error}</FormErrorMessage>}
    </FormControl>
  );
};

export default CustomSelect;
