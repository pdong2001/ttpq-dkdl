import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  InputProps,
  FormControlProps,
  Flex,
  Box,
} from '@chakra-ui/react';
import { useField } from 'formik';
import useCustomColorMode from '~/hooks/useColorMode';
import { Calendar } from 'primereact/calendar';
import { IonDatetime, IonDatetimeButton, IonModal } from '@ionic/react';

type Props = InputProps &
  FormControlProps & {
    dateFormat?: string;
    showTime?: boolean;
  };

const PrimeDatePicker = ({ name = 'datePicker', label, dateFormat, showTime, ...rest }: Props) => {
  const [field, meta, { setValue }] = useField(name);
  const { bgColor } = useCustomColorMode();

  return (
    <FormControl isInvalid={!!meta.error && meta.touched} {...rest}>
      <FormLabel bgColor={bgColor}>{label}</FormLabel>
      <Flex
        as={Calendar}
        rounded='md'
        name={field.name}
        value={field.value}
        onChange={(e: any) => {
          if (e.value) {
            setValue(e.value);
          }
        }}
        dateFormat={dateFormat}
        placeholder={label}
        showTime={showTime}
        appendTo={document.body}
      ></Flex>

      {/* <IonDatetime
        locale='vi'
        lang='vi'
        value={new Date('2022-12-19').toISOString()}
        onIonChange={(e) => alert(e.detail.value)}
      ></IonDatetime> */}

      {meta.error && <FormErrorMessage>{meta.error}</FormErrorMessage>}
    </FormControl>
  );
};

PrimeDatePicker.defaultProps = {
  dateFormat: 'dd-mm-yy',
  showTimeSelect: true,
  timeIntervals: 5,
};

export default PrimeDatePicker;
