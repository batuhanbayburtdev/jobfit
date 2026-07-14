import express from 'express';
import { upload } from '../middleware/upload.js';
import { extractTextFromFile } from '../services/fileExtractionService.js';

const router = express.Router();

router.post('/', upload.single('cvFile'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file was uploaded.' });
    }

    try {
        const text = await extractTextFromFile(req.file.buffer, req.file.mimetype);

        if (!text || text.trim().length === 0) {
            return res.status(422).json({ error: 'Could not extract any text from this file.' });
        }

        res.json({ text: text.trim() });
    } catch (err) {
        console.error('CV extraction failed:', err.message);

        if (err.message === 'UNSUPPORTED_FILE_TYPE') {
            return res.status(400).json({ error: 'Only PDF and Word (.docx) files are supported.' });
        }

        res.status(500).json({ error: 'Failed to process the uploaded file. Please try again.' });
    }
});

export default router;