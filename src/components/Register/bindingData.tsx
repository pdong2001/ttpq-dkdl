import { Tag } from '@chakra-ui/react';
import _ from 'lodash';
import { MoveType } from '~/dtos/Enums/MoveType.enum';
import { EventExp } from '~/dtos/Enums/EventExp.enum';
import { convertToAppDateTime } from '~/utils/date';

const moveType = {
  [MoveType.HCM]: 'Đi cùng CTN HCM',
  [MoveType.BY_YOUR_SELF]: 'Tự túc',
  [MoveType.OTHER]: 'Đi từ tỉnh khách',
}

const eventExp = {
  [EventExp.ChuaTungThamGia]: 'Chưa từng tham gia',
  [EventExp.Duoi3Lan]: 'Dưới 3 lần',
  [EventExp.Tren3Lan]: 'Trên 3 lần',
}

const mapSuccessData = (previewInfo) => {
  return {
    infos: {
      religiousName: _.get(previewInfo, 'religiousName', ''),
      phoneNumber: _.get(previewInfo, 'phoneNumber', ''),
      identityCard: _.get(previewInfo, 'identityCard', ''),
      dateOfBirth: _.get(previewInfo, 'dateOfBirth', ''),
      email: _.get(previewInfo, 'email', ''),
      organizationStructureId: _.get(previewInfo, 'organizationStructureId', ''),
      gender: _.get(previewInfo, 'gender') == 0 ? 'Nam' : 'Nữ',
    },
    schedules: {
      [MoveType.HCM]: {
        moveType: <Tag variant='outline' colorScheme={'blue'}>{moveType[_.get(previewInfo, 'moveType', 0)]}</Tag>,
        startAddressId: _.get(previewInfo, 'startAddressId', ''),
        startTimeId: _.get(previewInfo, 'startTimeId', ''),
        leaveTimeId: _.get(previewInfo, 'leaveTimeId', ''),
      },
      [MoveType.BY_YOUR_SELF]: {
        moveType: <Tag variant='outline' colorScheme={'pink'}>{moveType[_.get(previewInfo, 'moveType', 0)]}</Tag>,
        otherStartAddress: _.get(previewInfo, 'otherStartAddress', ''),
        otherStartTime: convertToAppDateTime(_.get(previewInfo, 'otherStartTime', '')),
        otherLeaveTime: convertToAppDateTime(_.get(previewInfo, 'otherLeaveTime', '')),
      },
      [MoveType.OTHER]: {
        moveType: <Tag variant='outline' colorScheme={'green'}>{moveType[_.get(previewInfo, 'moveType', 0)]}</Tag>,
        otherStartAddress: _.get(previewInfo, 'otherStartAddress', ''),
        otherStartTime: convertToAppDateTime(_.get(previewInfo, 'otherStartTime', '')),
        startPlaneCode: _.get(previewInfo, 'startPlaneCode', ''),
        otherLeaveTime: convertToAppDateTime(_.get(previewInfo, 'otherLeaveTime', '')),
        returnPlaneCode: _.get(previewInfo, 'returnPlaneCode', ''),
      }
    },
    jobs: {
      type: eventExp[_.get(previewInfo, 'type', '')],
      strongPointIds: _.get(previewInfo, 'strongPointIds', ''),
      expDepartmentIds: _.get(previewInfo, 'expDepartmentIds', ''),
      wishDepartmentIds: _.get(previewInfo, 'wishDepartmentIds', ''),
      receiveCardAddressId: _.get(previewInfo, 'receiveCardAddressId', ''),
      note: _.get(previewInfo, 'note', ''),
    },
    avatar: _.get(previewInfo, 'avatarPath', ''),
    fullName: _.get(previewInfo, 'fullName', ''),
  };
}

export { mapSuccessData };
