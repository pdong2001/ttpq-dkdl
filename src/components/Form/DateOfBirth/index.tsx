import {
  FormControl,
  FormControlProps,
  FormErrorMessage,
  FormLabel,
  HStack,
  SelectProps,
  StackProps,
  VisuallyHiddenInput,
} from '@chakra-ui/react';
import CustomSelect from '~/components/Form/CustomSelect';
// import Select from '../CustomSelect';
import useCustomColorMode from '~/hooks/useColorMode';
import FloatingLabel from '../FloatingLabel/FloatingLabel';
import { useField } from 'formik';
import { useEffect } from 'react';

const monthOfBirth = [
  { id: '01', name: '01' },
  { id: '02', name: '02' },
  { id: '03', name: '03' },
  { id: '04', name: '04' },
  { id: '05', name: '05' },
  { id: '06', name: '06' },
  { id: '07', name: '07' },
  { id: '08', name: '08' },
  { id: '09', name: '09' },
  { id: '10', name: '10' },
  { id: '11', name: '11' },
  { id: '12', name: '12' },
];

type DateOfBirthProps = SelectProps & FormControlProps & StackProps & { delimiter?: string };

function DateOfBirth(props: DateOfBirthProps) {
  const { formTextColor } = useCustomColorMode();
  const { name, label, isRequired, delimiter = '/' } = props;

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const [field, meta, { setValue }] = useField(name);
  const [{ value: day }, { touched: dayTouched }] = useField(`${name}Day`);
  const [{ value: month }, { touched: monthTouched }] = useField(`${name}Month`);
  const [{ value: year }, { touched: yearTouched }] = useField(`${name}Year`);
  console.log('dob value', field.value);
  useEffect(() => {
    console.log(day, month, year);
    setValue({ year, month, day });
  }, [day, month, year, delimiter]);
  return (
    <FormControl
      as='fieldset'
      isRequired={isRequired}
      isInvalid={!!meta.error && dayTouched && monthTouched && yearTouched}
    >
      <FormLabel as='legend' color={formTextColor}>
        {label}
      </FormLabel>
      <HStack align='flex-end'>
        <FloatingLabel name={`${name}Day`} label='Ngày' color={formTextColor} hiddenErrorMessage />
        <CustomSelect
          placeholder='Tháng'
          data={monthOfBirth}
          name={`${name}Month`}
          hiddenErrorMessage
        />
        <FloatingLabel name={`${name}Year`} label='Năm' color={formTextColor} hiddenErrorMessage />
        <VisuallyHiddenInput {...field} />
      </HStack>
      <FormErrorMessage>{meta?.error}</FormErrorMessage>
    </FormControl>
  );
}

export default DateOfBirth;
