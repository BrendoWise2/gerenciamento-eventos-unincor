import { resolve } from 'path';
import PdfPoppler from 'pdf-poppler';
import * as fs from 'fs';

// ------------------------------------------------------------------------------------------------
// ATENÇÃO: A VARIÁVEL POPPLER_BIN_PATH É REMOVIDA AQUI.
// ISSO OBRIGA QUE O POPPLER ESTEJA NO PATH DE VARIÁVEIS DE AMBIENTE DO SISTEMA.
// ------------------------------------------------------------------------------------------------

// O caminho de destino absoluto dos arquivos
const UPLOAD_DIR = resolve(__dirname, '..', '..', 'tmp', 'uploads');

class GenerateThumbnailService {
    /**
     * Gera uma imagem da primeira página de um PDF e retorna o nome do arquivo JPG.
     * @param pdfFileName O nome do arquivo PDF (ex: 123-abc.pdf)
     * @returns O nome do arquivo da capa gerada (ex: 123-abc-1.jpg)
     */
    async execute(pdfFileName: string): Promise<string> {

        const pdfPath = resolve(UPLOAD_DIR, "pdf", pdfFileName);
        const baseName = pdfFileName.replace(/\.[^/.]+$/, "");

        // Verifica se o arquivo PDF original existe antes de tentar a conversão
        if (!fs.existsSync(pdfPath)) {
            throw new Error(`Arquivo PDF original nao encontrado: ${pdfFileName}`);
        }

        const options: PdfPoppler.Options = {
            format: 'jpeg',
            out_dir: UPLOAD_DIR,
            out_prefix: baseName,
            page: 1,
            scale: 1024,
        };

        try {
            await PdfPoppler.convert(pdfPath, options);

            const thumbnailFileName = `${baseName}-1.jpg`;
            return thumbnailFileName;

        } catch (error) {
            console.error('Erro CRÍTICO ao gerar a capa com pdf-poppler:', error);
            throw new Error('Falha no processamento do PDF para a capa.');
        }
    }
}

export { GenerateThumbnailService };
