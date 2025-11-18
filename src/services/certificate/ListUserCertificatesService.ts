import prismaClient from "../../prisma";

class ListUserCertificatesService {
    async execute(userId: string) {
        return await prismaClient.certificate.findMany({
            where: { userId },
            include: { event: true }
        });
    }
}

export { ListUserCertificatesService };
