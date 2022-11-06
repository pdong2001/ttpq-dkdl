import { AddressResponse } from '../AddressDtos/AddressResponse.model';
import { DKDaiLeDto } from '../DangKyDaiLeDtos/DKDaiLe.dto';
import { Gender } from '../Enums/Gender.enum';
import { PhanLoaiThanhNien } from '../Enums/PhanLoaiThanhNien.enum';
import { PositionType } from '../Enums/PositionType.enum';

export type SearchMemberRequestDto = {
  hoTen: string;
  soDienThoai: string;
  cccd: string;
};

export type MemberResponseDto = SearchMemberRequestDto & {
  id: number;
  email: string;
  linkFB: string;
  phapDanh: string;
  gioiTinh: Gender;
  noiLamViec: string;
  toSinhHoat: string;
  noiSinhHoat: string;
  linkAnhCMND: string;
  idCoCauToChuc: string;
  kyNangSoTruong: string;
  hinhThucDangKy: string;
  linkAnhDaiDien: string;
  permanentAddress: string;
  temporaryAddress: string;
  permanentAddressCode: string;
  temporaryAddressCode: string;
  ngaySinh: Date;
  createdBy: number;
  createdAt: Date;
  updatedBy: number;
  updatedAt: Date;
  positionId: PositionType;
  dangKyDaiLe: DKDaiLeDto;
  soLanDaVeChua: number;
  phanTramVeChua: number;
  phanLoaiThanhNien: PhanLoaiThanhNien;
  permanentCountry: AddressResponse;
  permanentCommune: AddressResponse;
  temporaryCountry: AddressResponse;
  temporaryCommune: AddressResponse;
  permanentProvince: AddressResponse;
  permanentDistrict: AddressResponse;
  temporaryProvince: AddressResponse;
  temporaryDistrict: AddressResponse;
};
