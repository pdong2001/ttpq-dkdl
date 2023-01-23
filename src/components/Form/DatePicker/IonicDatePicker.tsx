import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  InputProps,
  FormControlProps,
  Input,
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { useField } from 'formik';
import useCustomColorMode from '~/hooks/useColorMode';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonDatetime,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonModal,
  IonPopover,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import moment from 'moment';
import { useEffect, useRef, useState } from 'react';

type Props = InputProps &
  FormControlProps & {
    dateFormat?: string;
    showTime?: boolean;
  };

const IonicDatePicker = ({
  name = 'datePicker',
  label,
  dateFormat,
  placeholder,
  ...rest
}: Props) => {
  const [field, meta, { setValue }] = useField(name);
  const { bgColor } = useCustomColorMode();

  const modal = useRef<HTMLIonModalElement>(null);

  return (
    <FormControl isInvalid={!!meta.error && meta.touched} {...rest}>
      <FormLabel bgColor={bgColor}>{label}</FormLabel>
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
          <IonDatetime
            locale='vi'
            lang='vi'
            value={field.value}
            onIonChange={(e) => {
              setValue(e.detail.value);
            }}
          ></IonDatetime>
        </IonContent>
      </IonModal>

      {meta.error && <FormErrorMessage>{meta.error}</FormErrorMessage>}
    </FormControl>
  );
};

IonicDatePicker.defaultProps = {
  dateFormat: 'DD-MM-yyyy HH:mm',
};

export default IonicDatePicker;
