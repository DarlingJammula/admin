import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.CategoryCreateInput) {
    return this.prisma.category.create({ data });
  }

  async findAll(tree: boolean = false) {
    if (tree) {
      return this.getCategoryTree();
    }
    return this.prisma.category.findMany({
      include: { parent: true },
    });
  }

  async findOne(id: string) {
    return this.prisma.category.findUnique({
      where: { id },
      include: { children: true, parent: true },
    });
  }

  async update(id: string, data: Prisma.CategoryUpdateInput) {
    return this.prisma.category.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    return this.prisma.category.delete({
      where: { id },
    });
  }

  private async getCategoryTree(parentId: string | null = null): Promise<any[]> {
    const categories = await this.prisma.category.findMany({
      where: { parentId },
      include: { children: true }, // Simple include, but for deep tree we might need recursion or CTE
    });

    // For infinite nesting in Prisma without raw SQL CTE, we can do recursive fetching or fetch all and build tree in memory.
    // Fetching all and building in memory is better for performance if category count is < 1000.
    if (parentId === null) {
        const allCategories = await this.prisma.category.findMany();
        return this.buildTree(allCategories);
    }
    return categories;
  }

  private buildTree(categories: any[], parentId: string | null = null): any[] {
    return categories
      .filter((cat) => cat.parentId === parentId)
      .map((cat) => ({
        ...cat,
        children: this.buildTree(categories, cat.id),
      }));
  }
}
