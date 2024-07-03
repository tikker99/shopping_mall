import { Injectable } from '@nestjs/common';
import { Category, Product } from 'prisma/client';
import {
  ProductResponseItem,
  ProductWithCategoryResponseItem
} from 'src/controllers/products/schemas/products.response.dto';
import { CreateProductProps, UpdateProductProps } from 'src/services/products/types/inputs.type';
import { PrismaService } from '../prisma.service';

export type ProductWithCategory = Product & { category: Category };

@Injectable()
export class ProductsService {
  constructor(private readonly prismaService: PrismaService) {}

  async getProduct(productId: string): Promise<Product> {
    return this.prismaService.product.findFirst({
      where: { id: productId }
    });
  }

  async listProducts(): Promise<Product[]> {
    return this.prismaService.product.findMany();
  }

  async attachCategoryToProduct(product: Product): Promise<ProductWithCategory> {
    const category = await this.prismaService.category.findFirst({
      where: { id: product.categoryId }
    });
    return { ...product, category };
  }

  async createProduct(props: CreateProductProps): Promise<Product> {
    return this.prismaService.product.create({
      data: {
        title: props.title,
        description: props.description,
        price: props.price,
        sku: props.sku,
        categoryId: props.categoryId
      }
    });
  }

  async updateProduct(product: Product, props: UpdateProductProps): Promise<Product> {
    const updateQueryData = { ...product, ...props };
    return this.prismaService.product.update({
      where: { id: product.id },
      data: updateQueryData
    });
  }

  async deleteProduct(productId: string): Promise<Product> {
    return this.prismaService.product.delete({
      where: { id: productId }
    });
  }

  constructProductResponseItemsList(products: Product[]): ProductResponseItem[] {
    return products.map((i) => this.constructProductResponseItem(i));
  }

  constructProductWithCategoryResponseItem(product: ProductWithCategory): ProductWithCategoryResponseItem {
    return {
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.price,
      sku: product.sku,
      category: {
        id: product.category?.id,
        title: product.category?.title,
        description: product.category?.description,
      }
    };
  }

  constructProductResponseItem(product: Product): ProductResponseItem {
    return {
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.price,
      sku: product.sku,
      categoryId: product.categoryId
    };
  }
}
