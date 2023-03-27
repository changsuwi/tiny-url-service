import { prisma } from '@/lib/prisma';
import { URLModel } from '@/lib/url/url.model';

export class URLRepository {
  async postURL(url: string): Promise<URLModel> {
    return await prisma.url.create({
      data: {
        originalURL: url,
      },
    });
  }

  async getURL(id: number): Promise<URLModel> {
    return await prisma.url.findUniqueOrThrow({
      where: { id },
    });
  }

  async updateURLKey(id: number, key: string): Promise<URLModel> {
    return await prisma.url.update({
      data: {
        key,
      },
      where: {
        id,
      },
    });
  }
}
