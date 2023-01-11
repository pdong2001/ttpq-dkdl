import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  InputProps,
  FormHelperText,
  Box,
  Flex,
} from '@chakra-ui/react';
import { useField } from 'formik';
import { useEffect, useRef, useState } from 'react';
import useCustomColorMode from '~/hooks/useColorMode';
import { MultiSelect } from 'primereact/multiselect';
import { SelectItemOptionsType } from 'primereact/selectitem';

type MultiSelectOption = {
  label: string;
  value: any;
  colorScheme?: string;
};
type Props = InputProps & {
  tagColorScheme?: string;
  optionLabel?: string;
  optionValue?: string;
  closeMenuOnSelect?: boolean;
  isMulti?: boolean;
  hiddenErrorMessage?: boolean;
  helperText?: any;
  isSearchable?: boolean;
  label?: any;
  isClearable?: boolean;
} & { options?: SelectItemOptionsType };

const PrimeMultiSelect = (props: Props) => {
  const {
    name,
    options,
    label,
    isRequired,
    optionLabel = 'label',
    optionValue = 'value',
    hiddenErrorMessage,
    placeholder,
    helperText,
  } = props;
  const { primaryColor } = useCustomColorMode();
  //@ts-ignore
  const [field, { error, touched }, helpers] = useField(name);
  const isInvalid = !!error && touched;
  // const value = isMulti
  //   ? validOptions.filter((item) => field.value?.includes?.(item.value))
  //   : validOptions.find((item) => field.value === item.value);

  const selectRef = useRef<any>();
  useEffect(() => {
    if (isInvalid && selectRef.current) {
      selectRef.current.focus?.();
    }
  }, [isInvalid]);

  return (
    <FormControl isRequired={isRequired} isInvalid={isInvalid}>
      <FormLabel>{label}</FormLabel>
      <Flex width={'full'}>
        <MultiSelect
          {...field}
          ref={selectRef}
          optionLabel={optionLabel}
          optionValue={optionValue}
          placeholder={placeholder}
          options={options}
          display='chip'
          onBlur={() => {
            helpers.setTouched(true);
          }}
          width='100%'
          style={{ flexGrow: 1, maxWidth: '100%' }}
        />
      </Flex>

      {helperText && <FormHelperText>{helperText}</FormHelperText>}
      {!hiddenErrorMessage && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};

export default PrimeMultiSelect;
