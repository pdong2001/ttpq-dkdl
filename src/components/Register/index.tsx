import {
  Stack,
  Heading,
  Box,
  Text,
  Image,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tr,
  Alert,
  Divider,
  Th,
  Thead,
  Flex,
} from '@chakra-ui/react';
import _ from 'lodash';
import { Card, CardBody } from '@chakra-ui/card';
import { InfoOutlineIcon } from '@chakra-ui/icons';
import { getImageSrc } from '~/utils/functions';

const TableComponent = (infos, mapTitles): JSX.Element => {
  // const filteredInfos = {};
  // Object.keys(infos).forEach((key) => {
  //   const value = infos[key];
  //   if (_.isArray(value)) {
  //     if (value.length) {
  //       filteredInfos[key] = value;
  //       debugger;
  //   } else if (value) {
  //     filteredInfos[key] = value;
  //   }
  // });
  return (
    <TableContainer>
      <Table variant='simple' colorScheme={'gray'} style={{ tableLayout: 'fixed' }} w='full'>
        <Tbody>
          {_.map(infos, (info, key) => {
            if (!info) return;
            return (
              <Tr key={key}>
                <Td>
                  <Flex flexWrap={'wrap'} gap='3'>
                    <Box fontWeight={'bold'} whiteSpace={'nowrap'}>
                      {mapTitles[key]}
                    </Box>
                    <Box>{info}</Box>
                  </Flex>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

const LeaderComponent = (leader): JSX.Element => {
  const { fullName, religiousName, avatarPath, phoneNumber } = leader;
  return (
    <>
      <Alert status='info'>
        <InfoOutlineIcon />
        <Heading p={2} as='h5' size='md'>
          Trưởng nhóm
        </Heading>
      </Alert>
      <Card direction={{ base: 'row' }} overflow='hidden' variant='outline' pt={5} pl={2}>
        <Image
          boxSize={{ base: '60px', sm: '70px', md: '100px' }}
          objectFit='cover'
          src={getImageSrc(avatarPath)}
          alt={fullName}
        />
        <Stack>
          <CardBody>
            <Box pl={{ base: '10px', sm: '10px', md: '30px' }}>
              <Heading size={{ base: 'sm', sm: 'md' }}>{fullName}</Heading>
              <Divider />
              <Text fontSize={{ base: '14px', sm: '16px' }}>{religiousName}</Text>
              <Text fontSize={{ base: '14px', sm: '16px' }}>{phoneNumber}</Text>
            </Box>
          </CardBody>
        </Stack>
      </Card>
    </>
  );
};

const OtherInfo = ({ isLeader, title, subTitle }) => {
  return (
    <>
      <Card direction={{ base: 'column', sm: 'column' }} overflow='hidden' pr={5}>
        <TableContainer>
          <Table variant='simple' colorScheme={'gray'} size='md'>
            <Thead>
              <Tr>
                <Th pl={1}>{isLeader ? 'Nhóm trưởng' : 'Thông tin khác'}</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td fontSize={{ base: 'xs', sm: 'md', md: 'lg' }} pl={1}>
                  {isLeader ? '' : 'Pháp danh: '} {title}
                </Td>
              </Tr>
              <Tr>
                <Td fontSize={{ base: 'xs', sm: 'md', md: 'lg' }} pl={1}>
                  {isLeader ? '' : 'Nơi tu tập: '}
                  {subTitle}
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </Card>
    </>
  );
};

export { LeaderComponent, TableComponent, OtherInfo };
