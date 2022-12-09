import _ from 'lodash';
import { MoveType } from '~/dtos/Enums/MoveType.enum';
import { EventExp } from '~/dtos/Enums/EventExp.enum';

const MOVE_TYPE_TITLE = {
  [MoveType.WithCTN]: 'Đi cùng xe CTN',
  [MoveType.Other]: 'Tự túc',
  [MoveType.ByPlane]: 'Máy bay',
};

const EVENT_EXP_TITLE = {
  [EventExp.ChuaTungThamGia]: 'Lần đầu tiên',
  [EventExp.Duoi3Lan]: 'Dưới 3 lần',
  [EventExp.Tren3Lan]: 'Trên 3 lần',
};

const REGISTER_INFO_TITLE = {
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
  // thêm field
  transitType: 'Đăng ký ô tô',
  // jobs
  exps: 'Số lần về chùa',
  strongPointIds: 'Kỹ năng, sở trường',
  expDepartmentIds: 'Kinh nghiệm ở ban',
  wishDepartmentId: 'Nguyện vọng vào ban',
  receiveCardAddressId: 'Nơi nhận thẻ',
  note: 'Ghi chú',
};

// // thêm field
// const TRANSIT_TYPE_TITLE = {
//   [TransitType.ChieuDi]: 'Chiều đi (Từ Tân Sơn Nhất về chùa)',
//   [TransitType.ChieuVe]: 'Chiều về (Từ chùa về Tân Sơn Nhất)',
//   [TransitType.CaHaiChieu]: 'Cả hai chiều',
//   [TransitType.TuTuc]: 'Tự túc',
// };

export { REGISTER_INFO_TITLE, MOVE_TYPE_TITLE, EVENT_EXP_TITLE };
