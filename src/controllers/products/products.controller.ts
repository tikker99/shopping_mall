import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import {
  ProductResponseItem,
  ProductWithCategoryResponseItem
} from 'src/controllers/products/schemas/products.response.dto';
import { BadRequestException } from '@nestjs/common/exceptions/bad-request.exception';
import {
  CreateProductRequestBody,
  UpdateProductRequestBody
} from 'src/controllers/products/schemas/products.request.dto';
import { ProductsService } from 'src/services/products/products.service';
import { Product } from 'prisma/client';
import { ProductWithCategory } from 'src/services/products/types/products.type';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Products')
@Controller('/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiOkResponse({ status: 200, type: ProductWithCategoryResponseItem })
  @Get('/:productId')
  async getProductById(@Param('productId') productId: string): Promise<ProductWithCategoryResponseItem> {
    const product = await this.productsService.getProduct(productId);
    if (!product) {
      throw new BadRequestException('Product not found');
    }
    const productWithCategory: ProductWithCategory = await this.productsService.attachCategoryToProduct(product);
    return this.productsService.constructProductWithCategoryRestResponseItem(productWithCategory);
  }

  @ApiOkResponse({ status: 201, type: ProductResponseItem })
  @Post()
  async createProduct(@Body() body: CreateProductRequestBody): Promise<ProductResponseItem> {
    const product = await this.productsService.getProductWithSku(body.sku);
    if (product) {
      throw new BadRequestException('Product with this SKU already exists');
    }
    const newProduct: Product = await this.productsService.createProduct(body);
    return this.productsService.constructProductRestResponseItem(newProduct);
  }

  @ApiOkResponse({ status: 200, type: ProductResponseItem })
  @Put('/:productId')
  async updateProduct(
    @Param('productId') productId: string,
    @Body() body: UpdateProductRequestBody
  ): Promise<ProductResponseItem> {
    const product = await this.productsService.getProduct(productId);
    if (!product) {
      throw new BadRequestException('Product not found');
    }
    if (body.sku) {
      const product = await this.productsService.getProductWithSku(body.sku);
      if (product.id !== productId) {
        throw new BadRequestException('Product with this SKU already exists');
      }
    }
    const newProduct: Product = await this.productsService.updateProduct(product, body);
    return this.productsService.constructProductRestResponseItem(newProduct);
  }

  @ApiOkResponse({ status: 204 })
  @Delete('/:productId')
  async deleteProduct(@Param('productId') productId: string): Promise<void> {
    const product = await this.productsService.getProduct(productId);
    if (!product) {
      throw new BadRequestException('Product not found');
    }
    await this.productsService.deleteProduct(product.id);
  }
}
