import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, SellerStatus, UserRole } from '@prisma/client';

@Injectable()
export class SellersService {
  constructor(private prisma: PrismaService) {}

  async findAll(status?: SellerStatus) {
    const where: Prisma.SellerApplicationWhereInput = status ? { status } : {};
    return this.prisma.sellerApplication.findMany({
      where,
      include: { user: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    return this.prisma.sellerApplication.findUnique({
      where: { id },
      include: { user: true },
    });
  }

  async approve(id: string) {
    const application = await this.prisma.sellerApplication.update({
      where: { id },
      data: { status: SellerStatus.APPROVED },
      include: { user: true },
    });

    // Update user role to SELLER
    await this.prisma.user.update({
      where: { id: application.userId },
      data: { role: UserRole.SELLER },
    });

    return application;
  }

  async reject(id: string, reason: string) {
    return this.prisma.sellerApplication.update({
      where: { id },
      data: {
        status: SellerStatus.REJECTED,
        rejectionReason: reason,
      },
    });
  }

  async requestInfo(id: string, message: string) {
    return this.prisma.sellerApplication.update({
      where: { id },
      data: {
        status: SellerStatus.NEEDS_INFO,
        adminNotes: message,
      },
    });
  }
}
