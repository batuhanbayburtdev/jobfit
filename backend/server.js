import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import analyzeRoute from './src/routes/analyze.js';
import extractCvRoute from './src/routes/extractCv.js';
import analyzeJobRoute from './src/routes/analyzeJob.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '1mb' }));

app.use('/api/analyze', analyzeRoute);
app.use('/api/extract-cv', extractCvRoute);
app.use('/api/analyze-job', analyzeJobRoute);

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});