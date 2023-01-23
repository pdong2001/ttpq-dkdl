import {
  FormControl,
  FormControlProps,
  FormErrorMessage,
  FormLabel,
  HStack,
  SelectProps,
  Stack,
  StackProps,
  VisuallyHiddenInput,
} from '@chakra-ui/react';
import FloatingLabel from '../FloatingLabel/FloatingLabel';
import { useField } from 'formik';
import { useEffect } from 'react';
import MultiSelect from '../MultiSelect';

const monthOfBirth = [
  { value: '01', label: '01' },
  { value: '02', label: '02' },
  { value: '03', label: '03' },
  { value: '04', label: '04' },
  { value: '05', label: '05' },
  { value: '06', label: '06' },
  { value: '07', label: '07' },
  { value: '08', label: '08' },
  { value: '09', label: '09' },
  { value: '10', label: '10' },
  { value: '11', label: '11' },
  { value: '12', label: '12' },
];
const dayOfMonths = new Array(31)
  .fill(0)
  .map((_, i) => i + 1)
  .map((number) => {
    const data = number < 10 ? `0${number}` : `${number}`;
    return {
      label: data,
      value: data,
    };
  });

type DateOfBirthProps = SelectProps & FormControlProps & StackProps;

function DateOfBirth(props: DateOfBirthProps) {
  const { name, label, isRequired, direction } = props;

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
      <FormLabel mb={0}>{label}</FormLabel>
      <Stack direction={direction} align='flex-end'>
        <MultiSelect name={dateName} options={dayOfMonths} placeholder='Ngày' hiddenErrorMessage />
        <MultiSelect
          placeholder='Tháng'
          options={monthOfBirth}
          name={monthName}
          hiddenErrorMessage
        />
        <FloatingLabel inputMode='numeric' name={yearName} label='Năm' hiddenErrorMessage />
        <VisuallyHiddenInput tabIndex={-1} {...field} />
      </Stack>
      <FormErrorMessage>{meta?.error}</FormErrorMessage>
    </FormControl>
  );
}

export default DateOfBirth;
