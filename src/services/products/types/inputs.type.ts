export interface CreateProductProps {
  title: string;
  description: string;
  sku: string;
  price: number;
  categoryId: string;
}

export type UpdateProductProps = Partial<CreateProductProps>;