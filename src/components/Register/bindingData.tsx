import { Tag } from '@chakra-ui/react';
import _ from 'lodash';
import moment from 'moment';
import { CAR_BOOKING_TYPE_TITLE, CLOTHING_SIZE_TITLE } from '~/configs/register';
import { CertificateRegistry } from '~/dtos/Enums/CertificateRegistry.enum';
import { EventExp } from '~/dtos/Enums/EventExp.enum';
import { MoveType } from '~/dtos/Enums/MoveType.enum';
import { convertToAppDateTime } from '~/utils/date';

const mapSuccessData = (previewInfo) => {
  return {
    infos: {
      religiousName: _.get(previewInfo, 'religiousName', ''),
      phoneNumber: _.get(previewInfo, 'phoneNumber', ''),
      identityCard: _.get(previewInfo, 'identityCard', ''),
      dateOfBirth:
        _.get(previewInfo, 'dateOfBirth', '') &&
        moment(_.get(previewInfo, 'dateOfBirth')).format('DD-MM-YYYY'),
      email: _.get(previewInfo, 'email', ''),
      organizationStructureId: _.get(previewInfo, 'organizationStructureId', ''),
      permanentAddress: _.get(previewInfo, 'permanentAddress', ''),
      temporaryAddress: _.get(previewInfo, 'temporaryAddress', ''),
      gender: _.get(previewInfo, 'gender') == 0 ? 'Nam' : 'Nữ',
    },
    schedules: {
      [MoveType.WithCTN]: {
        moveType: (
          <Tag variant='outline' colorScheme={'green'}>
            {MoveType.toString(_.get(previewInfo, 'moveType', 0) + '')}
          </Tag>
        ),
        startTimeId: _.get(previewInfo, 'startTimeId', ''),
        leaveTimeId: _.get(previewInfo, 'leaveTimeId', ''),
      },
      [MoveType.ByPlane]: {
        moveType: (
          <Tag variant='outline' colorScheme={'blue'}>
            {MoveType.toString(_.get(previewInfo, 'moveType', 0) + '')}
          </Tag>
        ),
        otherStartAddress: _.get(previewInfo, 'otherStartAddress', ''),
        otherStartTime: convertToAppDateTime(_.get(previewInfo, 'otherStartTime', '')),
        startPlaneCode: _.get(previewInfo, 'startPlaneCode', ''),
        otherLeaveTime: convertToAppDateTime(_.get(previewInfo, 'otherLeaveTime', '')),
        returnPlaneCode: _.get(previewInfo, 'returnPlaneCode', ''),
        // thêm field
        carBookingType: (
          <Tag variant='outline' colorScheme={'pink'}>
            {CAR_BOOKING_TYPE_TITLE[_.get(previewInfo, 'carBookingType', '')]}
          </Tag>
        ),
      },
      [MoveType.Other]: {
        moveType: (
          <Tag variant='outline' colorScheme={'pink'}>
            {MoveType.toString(_.get(previewInfo, 'moveType', 0) + '')}
          </Tag>
        ),
        otherStartAddress: _.get(previewInfo, 'otherStartAddress', ''),
        otherStartTime: convertToAppDateTime(_.get(previewInfo, 'otherStartTime', '')),
        otherLeaveTime: convertToAppDateTime(_.get(previewInfo, 'otherLeaveTime', '')),
      },
    },
    jobs: {
      exps: EventExp.toString(_.get(previewInfo, 'exps', 0) + ''),
      strongPointIds: _.get(previewInfo, 'strongPointIds', ''),
      expDepartmentIds: _.get(previewInfo, 'expDepartmentIds', ''),
      wishDepartmentId: _.get(previewInfo, 'wishDepartmentId', ''),
      receiveCardAddressId: _.get(previewInfo, 'receiveCardAddressId', ''),
      clothingSize: CLOTHING_SIZE_TITLE[_.get(previewInfo, 'clothingSize', '')],
      note: _.get(previewInfo, 'note', ''),
    },
    certRegistry: {
      [CertificateRegistry.NO]: {
        certificateRegistry: (
          <Tag variant='outline' colorScheme={'pink'}>
            {CertificateRegistry.toString(_.get(previewInfo, 'certificateRegistry'))}
          </Tag>
        ),
      },
      [CertificateRegistry.YES]: {
        certificateRegistry: (
          <Tag variant='outline' colorScheme={'green'}>
            {CertificateRegistry.toString(_.get(previewInfo, 'certificateRegistry'))}
          </Tag>
        ),
        companyNameVIE: _.get(previewInfo, 'companyNameVIE', ''),
        companyNameEN: _.get(previewInfo, 'companyNameEN', ''),
      },
    },
    avatar: _.get(previewInfo, 'avatarPath', ''),
    fullName: _.get(previewInfo, 'fullName', ''),
  };
};

export { mapSuccessData };
