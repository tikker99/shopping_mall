import { ApiProperty } from '@nestjs/swagger';

//TODO: Move this to category.response.dto.ts once category controller is implemented
class CategoryResponseItem {
  @ApiProperty({ type: String, description: 'Category id', nullable: false })
  id: string;

  @ApiProperty({ type: String, description: 'Category title', nullable: false })
  title: string;

  @ApiProperty({ type: String, description: 'Category description', nullable: false })
  description: string;
}

export class ProductResponseItem {
  @ApiProperty({ type: String, description: 'Product id', nullable: false })
  id: string;

  @ApiProperty({ type: String, description: 'Product title', nullable: false })
  title: string;

  @ApiProperty({ type: String, description: 'Product description', nullable: false })
  description: string;

  @ApiProperty({ type: String, description: 'Product SKU', nullable: false })
  sku: string;

  @ApiProperty({ type: Number, description: 'Product price', nullable: false })
  price: number;

  @ApiProperty({ type: String, description: 'Product category', nullable: true })
  categoryId: string;
}

export class ProductWithCategoryResponseItem {
  @ApiProperty({ type: String, description: 'Product id', nullable: false })
  id: string;

  @ApiProperty({ type: String, description: 'Product title', nullable: false })
  title: string;

  @ApiProperty({ type: String, description: 'Product description', nullable: false })
  description: string;

  @ApiProperty({ type: String, description: 'Product SKU', nullable: false })
  sku: string;

  @ApiProperty({ type: Number, description: 'Product price', nullable: false })
  price: number;

  @ApiProperty({ type: CategoryResponseItem, description: 'Product category', nullable: false })
  category: CategoryResponseItem;
}