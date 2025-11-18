import prismaClient from "../../prisma";
import PDFDocument from "pdfkit";
import QRCode from "qrcode";
import fs from "fs";
import path from "path";

interface PDFRequest {
    certificateId: string;
}

class GenerateCertificatePDFService {
    async execute({ certificateId }: PDFRequest) {
        const certificate = await prismaClient.certificate.findFirst({
            where: { id: certificateId },
            include: {
                user: true,
                event: true
            }
        });

        if (!certificate) {
            throw new Error("Certificado não encontrado.");
        }

        // Caminho onde o PDF será salvo
        const outputDir = path.resolve(__dirname, "../../../certificates");
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir);
        }

        const pdfPath = path.join(outputDir, `${certificate.code}.pdf`);
        const doc = new PDFDocument({ margin: 50 });

        const stream = fs.createWriteStream(pdfPath);
        doc.pipe(stream);

        // Gerar QR Code com o código de validação
        const qrCodeData = await QRCode.toDataURL(
            `https://seusite.com/certificate/validate?code=${certificate.code}`
        );
        const qrImage = qrCodeData.replace(/^data:image\/png;base64,/, "");
        const qrBuffer = Buffer.from(qrImage, "base64");

        // -----------------------------
        // Cabeçalho simples
        // -----------------------------
        doc.fontSize(20).text("CERTIFICADO DE PARTICIPAÇÃO", { align: "center" });
        doc.moveDown(2);

        // -----------------------------
        // Conteúdo do certificado
        // -----------------------------
        doc.fontSize(14).text(
            `Certificamos que ${certificate.user.name} participou do evento "${certificate.event.title}",`
        );

        doc.text(
            `realizado em ${certificate.event.date.toLocaleDateString("pt-BR")},`
        );

        doc.text(`totalizando carga horária de ${certificate.event.workload} horas.`);

        doc.moveDown(2);

        // QR CODE
        doc.image(qrBuffer, { width: 120, align: "left" });

        doc.fontSize(10).text(`Código de validação: ${certificate.code}`);
        doc.text("Valide em: https://seusite.com/certificate/validate");

        doc.end();

        // Aguardar finalização
        await new Promise<void>((resolve) => {
            stream.on("finish", () => resolve());
        });


        return {
            message: "PDF gerado com sucesso!",
            file: `${certificate.code}.pdf`,
            path: pdfPath
        };
    }
}

export { GenerateCertificatePDFService };
