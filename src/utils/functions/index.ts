import API from '~/apis/constants';
import { ReceiveCardAddressDto } from '~/dtos/ReceiveCardLocations/ReceiveCardAddressDto.model';
const printByPattern = (pattern) => (format, data) =>
  format.replace(pattern, (match) => data[match.replace(/\W/g, '')]);

export const mapReceiverCardAddressDetail = (receiverCardAddress?: ReceiveCardAddressDto) => {
  if (!receiverCardAddress) {
    return '';
  }
  const { ward, district, province, name } = receiverCardAddress;
  const address = [
    [ward?.pre, ward?.name],
    [district?.pre, district?.name],
    [province?.pre, province?.name],
  ]
    .map((addr) => addr.join(' '))
    .join(', ');
  return { ...receiverCardAddress, name: `${name}, ${address}`, address };
};

export const formatUrl = printByPattern(/:(\w+)/g);

export const getImageSrc = (value?: string, scale?: number): string => {
  if (value) {
    if (value.startsWith('ImageUpload')) {
      return getImageSrcFromCtnpqServer(value, scale);
    } else if (!value.startsWith('http') && !value.startsWith('assets')) {
      while (value.indexOf('/') === 0) {
        value = value.slice(1);
      }
      value = import.meta.env.TTPQ_MEDIA_SERVER + '/avatars' + '/' + value;
    }
    return value;
  }

  return getImageSrcFromCtnpqServer('');
};

const getImageSrcFromCtnpqServer = (key: string, scale = -1) => {
  return formatUrl(API.GET_PHOTO, { key, scale });
};
