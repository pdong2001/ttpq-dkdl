import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  InputProps,
  FormControlProps,
  Input,
  Box,
  Button,
  ButtonGroup,
} from '@chakra-ui/react';
import { useField } from 'formik';
import useCustomColorMode from '~/hooks/useColorMode';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonDatetime,
  IonDatetimeButton,
  IonFooter,
  IonHeader,
  IonModal,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import moment from 'moment';
import { useRef } from 'react';

type Props = InputProps &
  FormControlProps & {
    dateFormat?: string;
    showTime?: boolean;
  };

const IonicDatePicker = ({ name = 'datePicker', label, dateFormat, ...rest }: Props) => {
  const [{ value }, meta, { setValue }] = useField(name);
  const { bgColor } = useCustomColorMode();

  const dateModal = useRef<HTMLIonModalElement>(null);
  const timeModal = useRef<HTMLIonModalElement>(null);

  return (
    <FormControl isInvalid={!!meta.error && meta.touched} {...rest}>
      <FormLabel bgColor={bgColor}>{label}</FormLabel>

      <ButtonGroup>
        <Button id='date'>{value ? moment(value).format(dateFormat) : 'Chọn ngày'}</Button>
        <Button id='time'>{value ? moment(value).format('HH:mm') : 'Chọn giờ'}</Button>
      </ButtonGroup>

      <IonModal
        ref={dateModal}
        class='ion-datetime-button-overlay'
        trigger='date'
        keepContentsMounted={true}
      >
        <IonFooter>
          <IonToolbar>
            <IonButtons slot='end'>
              <IonButton
                disabled={!value}
                strong={true}
                onClick={() => dateModal.current?.dismiss()}
              >
                Chọn
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonFooter>
        <IonDatetime
          value={value}
          presentation='date'
          onIonChange={(e) => {
            setValue(e.detail.value);
          }}
          lang='vi'
          locale='vi'
        ></IonDatetime>
      </IonModal>

      <IonModal
        ref={timeModal}
        class='ion-datetime-button-overlay'
        trigger='time'
        keepContentsMounted={true}
      >
        <IonDatetime
          value={value}
          presentation='time'
          onIonChange={(e) => {
            setValue(e.detail.value);
          }}
          id='datetime'
          locale='vi'
        ></IonDatetime>
        <IonFooter>
          <IonToolbar>
            <IonButtons slot='end'>
              <IonButton
                disabled={!value}
                strong={true}
                onClick={() => timeModal.current?.dismiss()}
              >
                Chọn
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonFooter>
      </IonModal>

      {/* 
      <Input
        id='date'
        placeholder={placeholder}
        value={field.value && moment(field.value).format(dateFormat)}
      />
      <IonModal ref={modal} trigger='date'>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot='start'>
              <IonButton onClick={() => modal.current?.dismiss()}>Hủy</IonButton>
            </IonButtons>
            <IonTitle>{label}</IonTitle>
            <IonButtons slot='end'>
              <IonButton strong={true} onClick={() => modal.current?.dismiss()}>
                Chọn
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className='ion-padding'>
          <Box
            margin={'0 auto'}
            as={IonDatetime}
            locale='vi'
            lang='vi'
            value={field.value}
            onIonChange={(e) => {
              setValue(e.detail.value);
            }}
          ></Box>
        </IonContent>
      </IonModal> */}

      {meta.error && <FormErrorMessage>{meta.error}</FormErrorMessage>}
    </FormControl>
  );
};

IonicDatePicker.defaultProps = {
  dateFormat: 'DD-MM-yyyy',
};

export default IonicDatePicker;
