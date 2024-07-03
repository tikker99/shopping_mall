import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from 'class-validator';
import { PrismaService } from 'src/services/prisma.service';
import { BadRequestException } from '@nestjs/common/exceptions/bad-request.exception';

export function ValidateProductSku(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: ProductSkuValidation
    });
  };
}

@ValidatorConstraint({ name: 'productSku', async: true })
@Injectable()
export class ProductSkuValidation implements ValidatorConstraintInterface {
  constructor(private prisma: PrismaService) {}

  async validate(value: string, validationArguments: ValidationArguments): Promise<boolean> {
    if (value) {
      const product = await this.prisma.product.findUnique({ where: { sku: value }});
      if (product) {
        throw new BadRequestException('Product with this SKU already exists');
      }
    }
    return true;
  }
}
