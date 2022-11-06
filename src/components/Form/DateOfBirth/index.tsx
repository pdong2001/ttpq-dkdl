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
  { id: '01', ten: '01' },
  { id: '02', ten: '02' },
  { id: '03', ten: '03' },
  { id: '04', ten: '04' },
  { id: '05', ten: '05' },
  { id: '06', ten: '06' },
  { id: '07', ten: '07' },
  { id: '08', ten: '08' },
  { id: '09', ten: '09' },
  { id: '10', ten: '10' },
  { id: '11', ten: '11' },
  { id: '12', ten: '12' },
];

type DateOfBirthProps = SelectProps & FormControlProps & StackProps & { delimiter?: string };

function DateOfBirth(props: DateOfBirthProps) {
  const { formTextColor } = useCustomColorMode();
  const { name, label, isRequired, delimiter = '-' } = props;

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const [field, meta, { setValue }] = useField(name);
  const [{ value: day }, { touched: dayTouched }] = useField(`${name}Day`);
  const [{ value: month }, { touched: monthTouched }] = useField(`${name}Month`);
  const [{ value: year }, { touched: yearTouched }] = useField(`${name}Year`);
  useEffect(() => {
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
