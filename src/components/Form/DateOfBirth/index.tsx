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

type DateOfBirthProps = SelectProps & FormControlProps & StackProps;

function DateOfBirth(props: DateOfBirthProps) {
  const { formTextColor } = useCustomColorMode();
  const { name, label, isRequired } = props;

  const dateName = `${name}Date`;
  const monthName = `${name}Month`;
  const yearName = `${name}Year`;

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const [field, meta, { setValue }] = useField(name);
  const [{ value: date }, { touched: dayTouched }] = useField(dateName);
  const [{ value: month }, { touched: monthTouched }] = useField(monthName);
  const [{ value: year }, { touched: yearTouched }] = useField(yearName);
  useEffect(() => {
    setValue({ year, month, date });
  }, [date, month, year]);
  return (
    <FormControl
      isRequired={isRequired}
      isInvalid={!!meta.error && dayTouched && monthTouched && yearTouched}
    >
      <FormLabel mb={0} color={formTextColor}>
        {label}
      </FormLabel>
      <HStack align='flex-end'>
        <FloatingLabel name={dateName} label='Ngày' color={formTextColor} hiddenErrorMessage />
        <CustomSelect placeholder='Tháng' data={monthOfBirth} name={monthName} hiddenErrorMessage />
        <FloatingLabel name={yearName} label='Năm' color={formTextColor} hiddenErrorMessage />
        <VisuallyHiddenInput tabIndex={-1} {...field} />
      </HStack>
      <FormErrorMessage>{meta?.error}</FormErrorMessage>
    </FormControl>
  );
}

export default DateOfBirth;
