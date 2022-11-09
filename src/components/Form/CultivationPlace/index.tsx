import {
  FormControl,
  FormControlProps,
  FormErrorMessage,
  FormLabel,
  InputProps,
  Stack,
  StackProps,
  VisuallyHiddenInput,
} from '@chakra-ui/react';
import CustomSelect from '~/components/Form/CustomSelect';
import useCustomColorMode from '~/hooks/useColorMode';
import { useField } from 'formik';
import { useEffect, useState } from 'react';
import API from '~/apis/constants';
import useAxios from '~/hooks/useAxios';

type CultivationPlaceProps = InputProps & FormControlProps & StackProps;

function CultivationPlace(props: CultivationPlaceProps) {
  const { formTextColor } = useCustomColorMode();
  const { name, label, isRequired, direction } = props;
  const [cultivationPlace, setCultivationPlace] = useState({});
  const groupName = `${name}Group`;
  const teamName = `${name}Team`;

  //@ts-ignore
  const [field, meta, { setValue }] = useField(name);
  const [{ value: groupId }, { touched: gTouch }] = useField(groupName);
  const [{ value: teamId }, { touched: tTouch }, { setTouched: setTTouch, setValue: setTeam }] =
    useField(teamName);

  const { data: groups } = useAxios(
    {
      method: 'get',
      url: API.GET_PROVINCE,
    },
    [],
  );

  const { data: teams } = useAxios(
    {
      method: 'get',
      url: `${API.GET_DISTRICT}/${groupId}`,
    },
    [groupId],
  );

  useEffect(() => {
    // setCultivationPlace({ groupId });
    setTTouch(false);
    setTeam('');
  }, [groupId]);

  useEffect(() => {
    setCultivationPlace({ groupId, teamId });
  }, [teamId]);

  useEffect(() => {
    setValue(cultivationPlace);
  }, [cultivationPlace]);
  console.log('cultivate error', !!meta.error, gTouch, tTouch, groupId);

  return (
    <FormControl isRequired={isRequired} isInvalid={!!meta.error && tTouch}>
      <FormLabel mb={0} color={formTextColor}>
        {label}
      </FormLabel>
      <Stack direction={direction} align='flex-end' {...props}>
        <CustomSelect
          name={groupName}
          data={groups}
          placeholder='Nơi sinh hoạt'
          hiddenErrorMessage
        />
        <CustomSelect
          name={teamName}
          data={teams}
          placeholder='Tổ'
          isDisabled={!groupId}
          hiddenErrorMessage
        />
        <VisuallyHiddenInput {...field} />
      </Stack>
      <FormErrorMessage>{meta.error && meta.error['teamId']}</FormErrorMessage>
    </FormControl>
  );
}
CultivationPlace.defaultProps = { direction: 'row' };

export default CultivationPlace;
