// Este arquivo existe para satisfazer o TypeScript.
// Ele declara o módulo "pdf-poppler" e as interfaces necessárias 
// para que o seu código TypeScript compile sem erros.

declare module 'pdf-poppler' {
    interface Options {
        format?: 'jpeg' | 'png' | 'tiff';
        out_dir: string;
        out_prefix: string;
        page?: number | string;
        scale?: number;
        poppler_path?: string;
        grayscale?: boolean;
        ownerPassword?: string;
        userPassword?: string;
    }

    interface Config {
        poppler_path?: string;
    }

    // A função principal de conversão
    function convert(pdfPath: string, options: Options): Promise<void>;

    // O objeto exportado
    const PdfPoppler: {
        convert: typeof convert;
        Options: Options;
    };

    export = PdfPoppler;
}
