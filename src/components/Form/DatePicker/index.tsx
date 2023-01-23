import ReactDatePicker from 'react-datepicker';
import {
  Input,
  InputGroup,
  InputRightElement,
  forwardRef,
  FormControl,
  FormErrorMessage,
  FormLabel,
  InputProps,
  FormControlProps,
} from '@chakra-ui/react';
import { useField } from 'formik';
import { MdDateRange } from 'react-icons/md';
import useCustomColorMode from '~/hooks/useColorMode';
import 'react-datepicker/dist/react-datepicker.css';
import './datePicker.css';

type Props = InputProps &
  FormControlProps & {
    dateFormat?: string;
    showTimeSelect?: boolean;
    timeIntervals?: number;
    minDate?: Date;
    minTime?: Date;
    maxDate?: Date;
    maxTime?: Date;
  };

const CustomDateInput = ({ value, onClick, onChange, label }: any, ref) => {
  const { bgColor } = useCustomColorMode();
  return (
    <>
      <Input
        readOnly
        placeholder=' '
        value={value}
        onChange={onChange}
        onClick={onClick}
        onFocus={onClick}
        ref={ref}
        autoComplete='off'
      />
      <FormLabel bgColor={bgColor}>{label}</FormLabel>
    </>
  );
};
const CustomInput = forwardRef(CustomDateInput);

const DateTimePicker = ({
  name = 'datePicker',
  label,
  dateFormat,
  showTimeSelect,
  timeIntervals,
  minDate,
  minTime,
  maxDate,
  maxTime,
  ...rest
}: Props) => {
  const [{ value }, meta, { setValue }] = useField(name);

  return (
    <FormControl variant='floating' isInvalid={!!meta.error && meta.touched} {...rest}>
      <InputGroup>
        <ReactDatePicker
          showPopperArrow={false}
          dateFormat={dateFormat}
          selected={value && new Date(value)}
          onChange={(value) => {
            if (value) {
              setValue(value.toISOString());
            }
          }}
          customInput={<CustomInput label={label} />}
          showTimeSelect={showTimeSelect}
          timeIntervals={timeIntervals}
          minDate={minDate}
          minTime={minTime}
          maxDate={maxDate}
          maxTime={maxTime}
        />
        <InputRightElement children={<MdDateRange />} />
      </InputGroup>
      {meta.error && <FormErrorMessage>{meta.error}</FormErrorMessage>}
    </FormControl>
  );
};

DateTimePicker.defaultProps = {
  dateFormat: 'dd-MM-yyyy HH:mm',
  showTimeSelect: true,
  timeIntervals: 5,
};

export default DateTimePicker;
