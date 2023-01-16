import API from '~/apis/constants';
import { ReceiveCardAddressDto } from '~/dtos/ReceiveCardLocations/ReceiveCardAddressDto.model';
import { PixelCrop } from 'react-image-crop';
import { TO_RADIANS } from '../common/constant';

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

export async function canvasPreview(
  image: HTMLImageElement,
  canvas: HTMLCanvasElement,
  crop: PixelCrop,
  scale = 1,
  rotate = 0,
) {
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('No 2d context');
  }

  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  // devicePixelRatio slightly increases sharpness on retina devices
  // at the expense of slightly slower render times and needing to
  // size the image back down if you want to download/upload and be
  // true to the images natural size.
  const pixelRatio = window.devicePixelRatio;
  // const pixelRatio = 1

  canvas.width = Math.floor(crop.width * scaleX * pixelRatio);
  canvas.height = Math.floor(crop.height * scaleY * pixelRatio);

  ctx.scale(pixelRatio, pixelRatio);
  ctx.imageSmoothingQuality = 'high';

  const cropX = crop.x * scaleX;
  const cropY = crop.y * scaleY;

  const rotateRads = rotate * TO_RADIANS;
  const centerX = image.naturalWidth / 2;
  const centerY = image.naturalHeight / 2;

  ctx.save();

  // 5) Move the crop origin to the canvas origin (0,0)
  ctx.translate(-cropX, -cropY);
  // 4) Move the origin to the center of the original position
  ctx.translate(centerX, centerY);
  // 3) Rotate around the origin
  ctx.rotate(rotateRads);
  // 2) Scale the image
  ctx.scale(scale, scale);
  // 1) Move the center of the image to the origin (0,0)
  ctx.translate(-centerX, -centerY);
  ctx.drawImage(
    image,
    0,
    0,
    image.naturalWidth,
    image.naturalHeight,
    0,
    0,
    image.naturalWidth,
    image.naturalHeight,
  );

  ctx.restore();
}

export function dataURItoBlob(dataURI) {
  // convert base64/URLEncoded data component to raw binary data held in a string
  let byteString;
  if (dataURI.split(',')[0].indexOf('base64') >= 0) byteString = window.atob(dataURI.split(',')[1]);
  else byteString = window.unescape(dataURI.split(',')[1]);
  // separate out the mime component
  const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
  // write the bytes of the string to a typed array
  const ia = new Uint8Array(byteString.length);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ia], { type: mimeString });
}

export const alertUnsave = function (e) {
  const confirmationMessage = 'o/';
  (e || window.event).returnValue = confirmationMessage; //Gecko + IE
  return confirmationMessage; //Webkit, Safari, Chrome
};
