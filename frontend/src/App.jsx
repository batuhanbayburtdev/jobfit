import { useState } from 'react';
import AnalyzeForm from './components/AnalyzeForm';
import ResultDisplay from './components/ResultDisplay';
import JobAnalysisResult from './components/JobAnalysisResult';
import { analyzeCvFit, analyzeJobRequirements } from './services/api';
import './App.css';

function App() {
    const [result, setResult] = useState(null);
    const [jobResult, setJobResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isAnalyzingJob, setIsAnalyzingJob] = useState(false);
    const [error, setError] = useState('');

    async function handleAnalyze(cv, jobDescription) {
        setIsLoading(true);
        setError('');
        setResult(null);
        setJobResult(null);

        try {
            const data = await analyzeCvFit(cv, jobDescription);
            setResult(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    }

    async function handleAnalyzeJobOnly(jobDescription) {
        setIsAnalyzingJob(true);
        setError('');
        setResult(null);
        setJobResult(null);

        try {
            const data = await analyzeJobRequirements(jobDescription);
            setJobResult(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsAnalyzingJob(false);
        }
    }

    return (
        <div className="app">
            <header className="app-header">
                <h1>JobFit</h1>
                <p>Paste your CV and a job description to see how well they match.</p>
            </header>

            <AnalyzeForm
                onSubmit={handleAnalyze}
                onAnalyzeJobOnly={handleAnalyzeJobOnly}
                isLoading={isLoading}
                isAnalyzingJob={isAnalyzingJob}
            />

            {error && <p className="app-error">{error}</p>}

            <ResultDisplay result={result} />
            <JobAnalysisResult result={jobResult} />
        </div>
    );
}

export default App;