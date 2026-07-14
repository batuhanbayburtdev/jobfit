import express from 'express';
import { validateJobAnalysisInput } from '../middleware/validate.js';
import { analyzeJobDescription } from '../services/llmService.js';

const router = express.Router();

router.post('/', validateJobAnalysisInput, async (req, res) => {
    const { jobDescription } = req.body;

    try {
        const result = await analyzeJobDescription(jobDescription);
        res.json(result);
    } catch (err) {
        console.error('Job analysis failed:', err.message);

        if (err.message === 'LLM_PARSE_ERROR' || err.message === 'LLM_SHAPE_ERROR') {
            return res.status(502).json({
                error: 'The analysis service returned an unexpected response. Please try again.',
            });
        }

        res.status(500).json({
            error: 'Something went wrong while analyzing the job description. Please try again.',
        });
    }
});

export default router;