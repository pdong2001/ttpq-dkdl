import { Stack, Heading, Box, Text, Image, Table, TableContainer, Tbody, Td, Tr, Alert, Divider, TableCaption, Tfoot, Th, Thead } from '@chakra-ui/react';
import _ from 'lodash';
import { Card, CardBody } from '@chakra-ui/card';
import { InfoOutlineIcon } from '@chakra-ui/icons';

const TableComponent = (infos, mapTitles): JSX.Element => {
  return (
    <TableContainer>
      <Table variant='simple' colorScheme={'gray'}>
        <Tbody>
          {_.map(infos, (info, key) => {
            return (
              <Tr key={key}>
                <Td pr={1} pl={{ base: 2, sm: 2, md: 2 }}>
                  <Text as='b'>{mapTitles[key]}</Text>
                </Td>
                <Td pl={{ base: 2, sm: 2, md: 2 }}>
                  {info}
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

const LeaderComponent = (leader): JSX.Element => {
  const { fullName, religiousName, avatarPath, phoneNumber } = leader;
  return (
    <>
      <Alert status='info'>
        <InfoOutlineIcon />
        <Heading p={2} as='h5' size='md'>Trưởng nhóm</Heading>
      </Alert>
      <Card
        direction={{ base: 'column', sm: 'row' }}
        overflow='hidden' variant='outline' pt={5} pl={2}
      >
        <Image boxSize='100px' objectFit='cover' src={avatarPath} alt='Dan Abramov' />
        <Stack>
          <CardBody>
            <Box textAlign={'center'} pl={10}>
              <Heading size='md'>{fullName}</Heading>
              <Text py='2'>{religiousName}</Text>
              <Text py='2'>{phoneNumber}</Text>
            </Box>
          </CardBody>
        </Stack>
      </Card>
    </>

  );
}

const OtherInfo = ({ isLeader, title, subTitle }) => {
  return (
    <>
      <Card
        direction={{ base: 'column', sm: 'column' }}
        overflow='hidden'
        pr={5}
      >
        <TableContainer>
          <Table variant='simple' colorScheme={'gray'}>
            <Thead>
              <Tr>
                <Th pl={1}>{isLeader ? 'Nhóm trưởng' : 'Thông tin khác'}</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td fontSize={{ base: 'xs', sm: 'md', md: 'lg' }} pl={1}>{isLeader ? '' : 'Pháp danh: '} {title}</Td>
              </Tr>
              <Tr>
                <Td fontSize={{ base: 'xs', sm: 'md', md: 'lg' }} pl={1}>{isLeader ? '' : 'Nơi tu tập: '}{subTitle}</Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </Card>
    </>
  )
}

export { LeaderComponent, TableComponent, OtherInfo }