export function validateAnalyzeInput(req, res, next) {
    const { cv, jobDescription } = req.body;

    if (!cv || typeof cv !== 'string' || cv.trim().length === 0) {
        return res.status(400).json({ error: 'CV text is required.' });
    }

    if (!jobDescription || typeof jobDescription !== 'string' || jobDescription.trim().length === 0) {
        return res.status(400).json({ error: 'Job description is required.' });
    }

    const MAX_LENGTH = 15000; // ~ a very long CV/JD, generous but bounded

    if (cv.length > MAX_LENGTH) {
        return res.status(400).json({ error: `CV text is too long (max ${MAX_LENGTH} characters).` });
    }

    if (jobDescription.length > MAX_LENGTH) {
        return res.status(400).json({ error: `Job description is too long (max ${MAX_LENGTH} characters).` });
    }

    next();
}

export function validateJobAnalysisInput(req, res, next) {
    const { jobDescription } = req.body;

    if (!jobDescription || typeof jobDescription !== 'string' || jobDescription.trim().length === 0) {
        return res.status(400).json({ error: 'Job description is required.' });
    }

    const MAX_LENGTH = 15000;

    if (jobDescription.length > MAX_LENGTH) {
        return res.status(400).json({ error: `Job description is too long (max ${MAX_LENGTH} characters).` });
    }

    next();
}