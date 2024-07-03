import { Controller, Get, Param, Post, Body, Put, Delete, HttpCode } from '@nestjs/common';
import {
  ProductResponseItem,
  ProductWithCategoryResponseItem
} from 'src/controllers/products/schemas/products.response.dto';
import { BadRequestException } from '@nestjs/common/exceptions/bad-request.exception';
import {
  CreateProductRequestBody,
  UpdateProductRequestBody
} from 'src/controllers/products/schemas/products.request.dto';
import { ProductsService, ProductWithCategory } from 'src/services/products/products.service';
import { Product } from '@prisma/client';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Products')
@Controller('/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiOkResponse({ status: 200, type: ProductWithCategoryResponseItem })
  @Get('/:productId')
  async getProductById(@Param('productId') productId: string): Promise<ProductWithCategoryResponseItem> {
    const product: Product = await this.productsService.getProduct(productId);
    if (!product) {
      throw new BadRequestException('Product not found');
    }
    const productWithCategory: ProductWithCategory = await this.productsService.attachCategoryToProduct(product);
    return this.productsService.constructProductWithCategoryResponseItem(productWithCategory);
  }

  @ApiOkResponse({ status: 200, type: [ProductResponseItem] })
  @Get()
  async listProducts(): Promise<ProductResponseItem[]> {
    const products: Product[] = await this.productsService.listProducts();
    return this.productsService.constructProductResponseItemsList(products);
  }

  @ApiOkResponse({ status: 201, type: ProductResponseItem })
  @Post()
  async createProduct(@Body() body: CreateProductRequestBody): Promise<ProductResponseItem> {
    const newProduct: Product = await this.productsService.createProduct(body);
    return this.productsService.constructProductResponseItem(newProduct);
  }

  @ApiOkResponse({ status: 200, type: ProductResponseItem })
  @Put('/:productId')
  async updateProduct(
    @Param('productId') productId: string,
    @Body() body: UpdateProductRequestBody
  ): Promise<ProductResponseItem> {
    const product: Product = await this.productsService.getProduct(productId);
    if (!product) {
      throw new BadRequestException('Product not found');
    }
    const newProduct: Product = await this.productsService.updateProduct(product, body);
    return this.productsService.constructProductResponseItem(newProduct);
  }

  @ApiOkResponse({ status: 204 })
  @HttpCode(204)
  @Delete('/:productId')
  async deleteProduct(@Param('productId') productId: string) {
    const product: Product = await this.productsService.getProduct(productId);
    if (!product) {
      throw new BadRequestException('Product not found');
    }
    await this.productsService.deleteProduct(product.id);
  }
}
