import { Module } from '@nestjs/common';
import { ProductsController } from 'src/controllers/products/products.controller';
import { ProductsService } from 'src/services/products/products.service';
import { PrismaService } from 'src/services/prisma.service';
import { ProductSkuValidation } from 'src/controllers/products/decorators/validate-product-sku.decorator';
import { ProductCategoryValidation } from 'src/controllers/products/decorators/validate-product-category.decorator';

@Module({
  controllers: [ProductsController],
  providers: [
    ProductSkuValidation,
    ProductCategoryValidation,
    ProductsService,
    PrismaService
  ]
})
export class AppModule {}
