import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsString, IsNumber, IsPositive, IsAlphanumeric, Length, ValidateIf, IsOptional } from 'class-validator';
import * as _ from 'lodash';
import { ValidateProductSku } from 'src/controllers/products/decorators/validate-product-sku.decorator';
import { ValidateProductCategory } from 'src/controllers/products/decorators/validate-product-category.decorator';

export class CreateProductRequestBody {
    @ApiProperty({ type: String, name: 'title', required: true, description: 'The title of the product' })
    @IsString()
    @IsNotEmpty()
    @IsDefined()
    title: string;

    @ApiProperty({ type: String, name: 'description', required: true, description: 'The description of the product' })
    @IsString()
    @IsNotEmpty()
    @IsDefined()
    description: string;

    @ApiProperty({ type: Number, name: 'price', required: true, description: 'The price of the product' })
    @IsNumber()
    @IsPositive()
    @IsDefined()
    price: number;

    @ApiProperty({ type: String, name: 'sku', required: true, description: 'The SKU of the product' })
    @ValidateProductSku()
    @IsString()
    @IsNotEmpty()
    @IsDefined()
    @IsAlphanumeric()
    @Length(8, 8)
    sku: string;

    @ApiProperty({ type: String, name: 'categoryId', required: true, description: 'The categoryId of the product' })
    @ValidateProductCategory()
    @IsString()
    @IsNotEmpty()
    @IsDefined()
    categoryId: string;
}

export class UpdateProductRequestBody {
    @ApiProperty({ type: String, name: 'title', required: false, description: 'The title of the product' })
    @ValidateIf(dto => _.has(dto, 'title'))
    @IsString()
    @IsNotEmpty()
    @IsDefined()
    title?: string;

    @ApiProperty({ type: String, name: 'description', required: false, description: 'The description of the product' })
    @ValidateIf(dto => _.has(dto, 'description'))
    @IsString()
    @IsNotEmpty()
    @IsDefined()
    description?: string;

    @ApiProperty({ type: Number, name: 'price', required: false, description: 'The price of the product' })
    @ValidateIf(dto => _.has(dto, 'price'))
    @IsNumber()
    @IsPositive()
    @IsDefined()
    price?: number;

    @ApiProperty({ type: String, name: 'sku', required: false, description: 'The SKU of the product' })
    @ValidateIf(dto => _.has(dto, 'sku'))
    @ValidateProductSku()
    @IsString()
    @IsNotEmpty()
    @IsDefined()
    @IsAlphanumeric()
    @Length(8, 8)
    sku?: string;

    @ApiProperty({ type: String, name: 'categoryId', required: false, description: 'The categoryId of the product' })
    @ValidateIf(dto => _.has(dto, 'categoryId'))
    @ValidateProductCategory()
    @IsString()
    @IsNotEmpty()
    @IsDefined()
    categoryId?: string;
}