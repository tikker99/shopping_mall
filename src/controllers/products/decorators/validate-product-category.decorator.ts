import { Injectable, } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from 'class-validator';
import { PrismaService } from 'src/services/prisma.service';
import { BadRequestException } from '@nestjs/common/exceptions/bad-request.exception';

export function ValidateProductCategory(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: ProductCategoryValidation
    });
  };
}

@ValidatorConstraint({ name: 'productCategory', async: true })
@Injectable()
export class ProductCategoryValidation implements ValidatorConstraintInterface {
  constructor(private prisma: PrismaService) {}

  async validate(value: string, validationArguments: ValidationArguments ): Promise<boolean> {
    if (validationArguments['object']['categoryId']) {
      const category = await this.prisma.category.findUnique({ where: { id: value }});
      if (!category) {
        throw new BadRequestException('Category not found');
      }
    }
    return true;
  }
}
