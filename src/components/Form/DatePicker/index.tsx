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
  FormControlProps & { dateFormat?: string; showTimeSelect?: boolean; timeIntervals?: number };

const customDateInput = ({ value, onClick, onChange, label }: any, ref) => {
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
const CustomInput = forwardRef(customDateInput);

const DateTimePicker = ({
  name = 'datePicker',
  label,
  dateFormat,
  showTimeSelect,
  timeIntervals,
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
            setValue(value?.toLocaleString());
          }}
          customInput={<CustomInput label={label} />}
          showTimeSelect={showTimeSelect}
          timeIntervals={timeIntervals}
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
