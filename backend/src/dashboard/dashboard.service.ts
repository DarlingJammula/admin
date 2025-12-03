import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  async getMetrics() {
    const [totalOrders, totalUsers, totalProducts, totalSales] = await Promise.all([
      this.prisma.order.count(),
      this.prisma.user.count(),
      this.prisma.product.count(),
      this.prisma.order.aggregate({
        _sum: { totalAmount: true },
      }),
    ]);

    return {
      totalOrders,
      totalUsers,
      totalProducts,
      totalSales: totalSales._sum.totalAmount || 0,
    };
  }

  async getRecentAlerts() {
    return this.prisma.notification.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: { user: true },
    });
  }
}
