import { getDocumentProxy, extractText } from 'unpdf';
import mammoth from 'mammoth';

export async function extractTextFromFile(buffer, mimetype) {
    if (mimetype === 'application/pdf') {
        const pdf = await getDocumentProxy(new Uint8Array(buffer));
        const { text } = await extractText(pdf, { mergePages: true });
        return text;
    }

    if (mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        const result = await mammoth.extractRawText({ buffer });
        return result.value;
    }

    throw new Error('UNSUPPORTED_FILE_TYPE');
}