import express from 'express';
import { validateAnalyzeInput } from '../middleware/validate.js';
import { analyzeCvFit } from '../services/llmService.js';

const router = express.Router();

router.post('/', validateAnalyzeInput, async (req, res) => {
    const { cv, jobDescription } = req.body;

    try {
        const result = await analyzeCvFit(cv, jobDescription);
        res.json(result);
    } catch (err) {
        handleAnalyzeError(err, res);
    }
});

function handleAnalyzeError(err, res) {
    // Log the error type server-side for debugging, but never log CV/job content itself
    console.error('Analysis failed:', err.message);

    if (err.message === 'LLM_PARSE_ERROR' || err.message === 'LLM_SHAPE_ERROR') {
        return res.status(502).json({
            error: 'The analysis service returned an unexpected response. Please try again.',
        });
    }

    if (err.status === 401) {
        return res.status(500).json({
            error: 'Server configuration error. Please contact the site owner.',
        });
    }

    if (err.status === 429) {
        return res.status(429).json({
            error: 'Too many requests right now. Please try again in a moment.',
        });
    }

    res.status(500).json({
        error: 'Something went wrong while analyzing your CV. Please try again.',
    });
}

export default router;