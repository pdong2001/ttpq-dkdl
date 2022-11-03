import {
  FormControl,
  FormControlProps,
  FormErrorMessage,
  FormLabel,
  StackProps,
  HStack,
  SelectProps,
} from '@chakra-ui/react';
import { useField } from 'formik';
// import Select from '../CustomSelect';
import useCustomColorMode from '~/hooks/useColorMode';
import FloatingLabel from '../FloatingLabel/FloatingLabel';

// const monthOfBirth = [
//   { id: '1', name: '01' },
//   { id: '2', name: '02' },
//   { id: '3', name: '03' },
//   { id: '4', name: '04' },
//   { id: '5', name: '05' },
//   { id: '6', name: '06' },
//   { id: '7', name: '07' },
//   { id: '8', name: '08' },
//   { id: '9', name: '09' },
//   { id: '10', name: '10' },
//   { id: '11', name: '11' },
//   { id: '12', name: '12' },
// ];

type DateOfBirthProps = SelectProps & FormControlProps & StackProps;

function DateOfBirth(props: DateOfBirthProps) {
  const { formTextColor } = useCustomColorMode();
  const { name, label, isRequired } = props;

  // @ts-ignore
  const [field, meta, helpers] = useField(props.name);

  return (
    <FormControl as='fieldset' isRequired={isRequired} isInvalid={!!meta.error && meta.touched}>
      <FormLabel as='legend' color={formTextColor}>
        {label}
      </FormLabel>
      <HStack align='flex-end'>
        <FloatingLabel name={`${name}Day`} label='Ngày' color={formTextColor} />
        <FloatingLabel name={`${name}Month`} label='Tháng' color={formTextColor} />
        {/* <Select name={`${name}Month`} placeholder='Tháng' data={monthOfBirth} /> */}
        <FloatingLabel name={`${name}Year`} label='Năm' color={formTextColor} />
      </HStack>
      <FormErrorMessage>{meta?.error}</FormErrorMessage>
    </FormControl>
  );
}

export default DateOfBirth;
