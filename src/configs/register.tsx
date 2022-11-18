import _ from 'lodash';
import { MoveType } from '~/dtos/Enums/MoveType.enum';
import { EventExp } from '~/dtos/Enums/EventExp.enum';

const moveType = {
  [MoveType.HCM]: 'Đi cùng CTN HCM',
  [MoveType.BY_YOUR_SELF]: 'Tự túc',
  [MoveType.OTHER]: 'Đi từ tỉnh khách',
}

const eventExp = {
  [EventExp.ChuaTungThamGia]: 'Lần đầu tiên',
  [EventExp.Duoi3Lan]: 'Dưới 3 lần',
  [EventExp.Tren3Lan]: 'Trên 3 lần',
}

const mapTitlesRegister = {
  fullName: 'Họ Và Tên',
  religiousName: 'Pháp danh',
  gender: 'Giới tính',
  dateOfBirth: 'Ngày sinh',
  phoneNumber: 'Số điện thoại',
  email: 'Email',
  identityCard: 'Căn cước',
  organizationStructureId: 'Địa điểm tu tập',
  permanentAddress: 'Địa chỉ thưởng trú',
  temporaryAddress: 'Địa chỉ tạm trú',
  // schedules
  moveType: 'Hình thức di chuyển',
  startAddressId: 'Nơi xuất phát',
  startTimeId: 'Nơi xuất phát',
  leaveTimeId: 'Thời gian trở về',
  otherStartAddress: 'Nơi xuất phát',
  otherStartTime: 'Ngày giờ đi',
  otherLeaveTime: 'Ngày giờ về',
  startPlaneCode: 'Mã chuyến bay đi',
  returnPlaneCode: 'Mã chuyến bay về',
  // jobs
  exps: 'Số lần về chùa',
  strongPointIds: 'Kỹ năng, sở trường',
  expDepartmentIds: 'Kinh nghiệm ở ban',
  wishDepartmentIds: 'Nguyện vọng vào ban',
  receiveCardAddressId: 'Nơi nhận thẻ',
  note: 'Ghi chú',
};

export { mapTitlesRegister, moveType, eventExp };
