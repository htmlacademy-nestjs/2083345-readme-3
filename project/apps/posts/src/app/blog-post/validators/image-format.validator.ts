import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ name: 'imageFormat', async: false })
export class ImageFormatValidator implements ValidatorConstraintInterface {
  validate(imageLink: string, args: ValidationArguments) {
    return imageLink.endsWith('.png') || imageLink.endsWith('.jpg');
  }

  defaultMessage(args: ValidationArguments) {
    return 'Only .jpg and .png image formats are supported.';
  }
}
