import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import analyzeRoute from './src/routes/analyze.js';
import extractCvRoute from './src/routes/extractCv.js';
import analyzeJobRoute from './src/routes/analyzeJob.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Render sits behind one proxy; without this every user looks like the same IP
app.set('trust proxy', 1);

app.use(helmet());

const allowedOrigins = [
    process.env.FRONTEND_URL || 'https://jobfit-kappa.vercel.app',
    'http://localhost:5173',
];
app.use(cors({ origin: allowedOrigins }));

app.use(express.json({ limit: '1mb' }));

const makeLimiter = (limit) =>
    rateLimit({
        windowMs: 15 * 60 * 1000,
        limit,
        standardHeaders: 'draft-7',
        legacyHeaders: false,
        message: { error: 'Too many requests, please try again later.' },
    });

// LLM routes cost money/quota, so they get the tightest limit
app.use('/api/analyze', makeLimiter(15), analyzeRoute);
app.use('/api/analyze-job', makeLimiter(15), analyzeJobRoute);
app.use('/api/extract-cv', makeLimiter(30), extractCvRoute);

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});