import { Tag } from '@chakra-ui/react';
import _ from 'lodash';
import { EVENT_EXP_TITLE, MOVE_TYPE_TITLE } from '~/configs/register';
import { MoveType } from '~/dtos/Enums/MoveType.enum';
import { convertToAppDateTime } from '~/utils/date';

const mapSuccessData = (previewInfo) => {
  return {
    infos: {
      religiousName: _.get(previewInfo, 'religiousName', ''),
      phoneNumber: _.get(previewInfo, 'phoneNumber', ''),
      identityCard: _.get(previewInfo, 'identityCard', ''),
      dateOfBirth: _.get(previewInfo, 'dateOfBirth', ''),
      email: _.get(previewInfo, 'email', ''),
      organizationStructureId: _.get(previewInfo, 'organizationStructureId', ''),
      permanentAddress: _.get(previewInfo, 'permanentAddress', ''),
      temporaryAddress: _.get(previewInfo, 'temporaryAddress', ''),
      gender: _.get(previewInfo, 'gender') == 0 ? 'Nam' : 'Nữ',
    },
    schedules: {
      [MoveType.HCM]: {
        moveType: (
          <Tag variant='outline' colorScheme={'blue'}>
            {MOVE_TYPE_TITLE[_.get(previewInfo, 'moveType', 0)]}
          </Tag>
        ),
        startAddressId: _.get(previewInfo, 'startAddressId', ''),
        startTimeId: _.get(previewInfo, 'startTimeId', ''),
        leaveTimeId: _.get(previewInfo, 'leaveTimeId', ''),
      },
      [MoveType.BY_YOUR_SELF]: {
        moveType: (
          <Tag variant='outline' colorScheme={'pink'}>
            {MOVE_TYPE_TITLE[_.get(previewInfo, 'moveType', 0)]}
          </Tag>
        ),
        otherStartAddress: _.get(previewInfo, 'otherStartAddress', ''),
        otherStartTime: convertToAppDateTime(_.get(previewInfo, 'otherStartTime', '')),
        otherLeaveTime: convertToAppDateTime(_.get(previewInfo, 'otherLeaveTime', '')),
      },
      [MoveType.OTHER]: {
        moveType: (
          <Tag variant='outline' colorScheme={'green'}>
            {MOVE_TYPE_TITLE[_.get(previewInfo, 'moveType', 0)]}
          </Tag>
        ),
        otherStartAddress: _.get(previewInfo, 'otherStartAddress', ''),
        otherStartTime: convertToAppDateTime(_.get(previewInfo, 'otherStartTime', '')),
        startPlaneCode: _.get(previewInfo, 'startPlaneCode', ''),
        otherLeaveTime: convertToAppDateTime(_.get(previewInfo, 'otherLeaveTime', '')),
        returnPlaneCode: _.get(previewInfo, 'returnPlaneCode', ''),
      },
    },
    jobs: {
      exps: EVENT_EXP_TITLE[_.get(previewInfo, 'exps', 0)],
      strongPointIds: _.get(previewInfo, 'strongPointIds', ''),
      expDepartmentIds: _.get(previewInfo, 'expDepartmentIds', ''),
      wishDepartmentId: _.get(previewInfo, 'wishDepartmentId', ''),
      receiveCardAddressId: _.get(previewInfo, 'receiveCardAddressId', ''),
      note: _.get(previewInfo, 'note', ''),
    },
    avatar: _.get(previewInfo, 'avatarPath', ''),
    fullName: _.get(previewInfo, 'fullName', ''),
  };
};

export { mapSuccessData };
