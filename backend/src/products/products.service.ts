import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, ProductStatus } from '@prisma/client';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async findAll(status?: ProductStatus) {
    const where: Prisma.ProductWhereInput = status ? { status } : {};
    return this.prisma.product.findMany({
      where,
      include: { category: true, seller: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    return this.prisma.product.findUnique({
      where: { id },
      include: { category: true, seller: true },
    });
  }

  async approve(id: string) {
    return this.prisma.product.update({
      where: { id },
      data: { status: ProductStatus.APPROVED },
    });
  }

  async reject(id: string, reason: string) {
    return this.prisma.product.update({
      where: { id },
      data: {
        status: ProductStatus.REJECTED,
        rejectionReason: reason,
      },
    });
  }
}
