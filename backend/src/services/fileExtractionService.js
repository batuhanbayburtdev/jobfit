import { getDocumentProxy, extractText } from 'unpdf';
import mammoth from 'mammoth';

export async function extractTextFromFile(buffer, mimetype) {
    const head = buffer.subarray(0, 4).toString('latin1');
    if (mimetype === 'application/pdf' && !head.startsWith('%PDF')) throw new Error('UNSUPPORTED_FILE_TYPE');
    if (mimetype.includes('wordprocessingml') && !head.startsWith('PK')) throw new Error('UNSUPPORTED_FILE_TYPE');

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
