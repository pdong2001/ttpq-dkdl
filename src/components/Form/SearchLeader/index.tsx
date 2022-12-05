import { SearchIcon } from '@chakra-ui/icons';
import {
  Avatar,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  SimpleGrid,
  Spinner,
  Text,
  VisuallyHiddenInput,
  VStack,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import useCustomColorMode from '~/hooks/useColorMode';
import API from '~/apis/constants';
import useSearch from '~/hooks/useSearch';
import { ResponseData } from '~/apis/common/type';
import { useField } from 'formik';
import { useAppSelector } from '~/hooks/reduxHook';
import useAxios from '~/hooks/useAxios';
import { formatUrl } from '~/utils/functions';
import { EventRegistryDto } from '~/dtos/EventRegistries/EventRegistryDto.model';
import { useRouteMatch } from 'react-router-dom';
import { HOME_WITH_SHORT_URI } from '~/routes';
import { loadPlugin } from 'immer/dist/internal';

type Props = {
  name: string;
  label: string;
  getLeader: (leader: any) => void;
  color?: string;
};
type LeaderData = {
  id: string;
  fullName?: string;
  religiousName?: string;
  avatarPath?: string;
};

const SearchLeader = (props: Props) => {
  const { path } = useRouteMatch();
  const { data: registerPage } = useAppSelector((state) => state.registerPage);
  const { name, label, getLeader, color } = props;
  const [field, { error, touched }, { setValue }] = useField(name);

  const [searchValue, setSearchValue] = useState('');
  const [inputValue, setInputValue] = useState('');
  const { primaryColor } = useCustomColorMode();
  // const { leaderId: editLeaderId } = useAppSelector((state) => state.registerInfo.data);
  const { leaderId } = useAppSelector((state) => state.register.data.register);
  const { data: editLeader, cancel: editToken } = useAxios<EventRegistryDto>(
    {
      url: formatUrl(API.GET_REGISTER_INFO, { id: leaderId }),
      transformResponse: ({ data }) => data,
    },
    [leaderId],
  );
  if (!leaderId) {
    editToken.cancel();
  }
  const { data, loaded } = useSearch<any, ResponseData<LeaderData>>(
    {
      method: 'post',
      url: API.SEARCH_LEADER,
      data: {
        eventId: registerPage.eventId,
        phoneNumber: searchValue,
        identityCard: searchValue,
      },
    },
    searchValue,
  );

  getLeader(data || editLeader);

  useEffect(() => {
    const { data: leader } = data || {};
    if (leader) {
      setValue(leader?.id);
    } else {
      setValue('');
    }
  }, [data]);

  const isInvalid = !!error && touched;
  const isValidSearchValue = inputValue?.length >= 8;

  const isHomePage = path === HOME_WITH_SHORT_URI;
  return (
    <FormControl isInvalid={isInvalid}>
      <FormLabel color={color}>{label}</FormLabel>
      <SimpleGrid
        columns={{ base: 1, md: isHomePage ? 1 : 2 }}
        alignItems='center'
        gap={{ base: 4, md: 6 }}
      >
        <InputGroup size='md'>
          <Input
            autoComplete='off'
            color={color}
            placeholder='Tìm bằng SĐT hoặc CCCD / CMT'
            focusBorderColor={primaryColor}
            pr='2.5rem'
            value={inputValue}
            onChange={(e) => {
              const { value } = e.target;
              setInputValue(value);
              if (isValidSearchValue) {
                setSearchValue(value);
              }
            }}
            inputMode='numeric'
          />
          <InputRightElement onClick={() => setSearchValue(inputValue)} width='2.6rem'>
            <IconButton size='sm' aria-label='Search' icon={<SearchIcon />} />
          </InputRightElement>
        </InputGroup>
        <HStack spacing={{ base: 4, md: 6, lg: 2 }} justifyContent='center'>
          {!data?.data && !editLeader ? (
            searchValue &&
            (loaded ? (
              <Text color='blue.300'>{'Không tìm thấy trưởng đoàn'}</Text>
            ) : (
              <Spinner color='blue.500' />
            ))
          ) : (
            <>
              <Avatar src={data?.data?.avatarPath || editLeader?.member?.avatarPath} />
              <VStack alignItems='start'>
                <Text color={primaryColor} fontWeight='bold'>
                  {data?.data?.fullName || editLeader?.member?.fullName}
                </Text>

                <Text color={isHomePage ? 'white' : ''}>
                  {data?.data?.religiousName || editLeader?.member?.religiousName}
                </Text>
              </VStack>
            </>
          )}
          {loaded && error && <FormErrorMessage>{error}</FormErrorMessage>}
        </HStack>
      </SimpleGrid>
      <VisuallyHiddenInput {...field} />
    </FormControl>
  );
};

export default SearchLeader;
