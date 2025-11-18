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
                event: {
                    include: {
                        speakers: {
                            include: {
                                speaker: true
                            }
                        }
                    }
                }
            }
        });

        if (!certificate) {
            throw new Error("Certificado não encontrado.");
        }

        // Extrair nomes dos palestrantes
        const speakerNames = certificate.event.speakers
            .map((s) => s.speaker.name)
            .join(", ");

        // Caminho onde o PDF será salvo
        const outputDir = path.resolve(__dirname, "..", "..", "tmp", "uploads", "pdfs");

        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        const pdfPath = path.join(outputDir, `${certificate.code}.pdf`);

        const doc = new PDFDocument({ margin: 50 });

        const stream = fs.createWriteStream(pdfPath);
        doc.pipe(stream);

        // Gerar QR Code
        const qrCodeData = await QRCode.toDataURL(
            `https://seusite.com/certificate/validate?code=${certificate.code}`
        );
        const qrImage = qrCodeData.replace(/^data:image\/png;base64,/, "");
        const qrBuffer = Buffer.from(qrImage, "base64");

        // -----------------------------
        // Cabeçalho
        // -----------------------------
        doc.fontSize(20).text("CERTIFICADO DE PARTICIPAÇÃO", { align: "center" });
        doc.moveDown(2);

        // -----------------------------
        // Conteúdo principal
        // -----------------------------
        doc.fontSize(14).text(
            `Certificamos que ${certificate.user.name} participou do evento "${certificate.event.title}",`
        );

        doc.text(
            `realizado em ${certificate.event.date.toLocaleDateString("pt-BR")},`
        );

        doc.text(
            `totalizando carga horária de ${certificate.event.workload} horas.`
        );

        doc.moveDown();

        doc.text(`Palestrante(s): ${speakerNames}`);

        doc.moveDown(2);

        // -----------------------------
        // QR CODE
        // -----------------------------
        doc.image(qrBuffer, { width: 120, align: "left" });

        doc.fontSize(10).text(`Código de validação: ${certificate.code}`);
        doc.text("Valide em: https://seusite.com/certificate/validate");

        doc.end();

        // Esperar finalizar gravação do PDF
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
