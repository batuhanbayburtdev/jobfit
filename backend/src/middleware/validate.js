import { validateText } from '../utils/validateText.js';

const MAX_LENGTH = 15000; // generous but bounded

function checkField(value, label) {
    if (!value || typeof value !== 'string' || value.trim().length === 0) {
        return `${label} is required.`;
    }
    if (value.length > MAX_LENGTH) {
        return `${label} is too long (max ${MAX_LENGTH} characters).`;
    }
    return validateText(value, label); // length, word count, gibberish
}

export function validateAnalyzeInput(req, res, next) {
    const { cv, jobDescription } = req.body;

    const error =
        checkField(cv, 'CV text') ||
        checkField(jobDescription, 'Job description');

    if (error) return res.status(400).json({ error });
    next();
}

export function validateJobAnalysisInput(req, res, next) {
    const { jobDescription } = req.body;

    const error = checkField(jobDescription, 'Job description');

    if (error) return res.status(400).json({ error });
    next();
}