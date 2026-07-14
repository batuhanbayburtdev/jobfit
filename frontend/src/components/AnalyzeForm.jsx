import { useState } from 'react';
import { extractCvFromFile } from '../services/api';

export default function AnalyzeForm({ onSubmit, onAnalyzeJobOnly, isLoading, isAnalyzingJob }) {
    const [cv, setCv] = useState('');
    const [jobDescription, setJobDescription] = useState('');
    const [validationError, setValidationError] = useState('');
    const [isExtracting, setIsExtracting] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();

        if (!cv.trim() || !jobDescription.trim()) {
            setValidationError('Please fill in both fields before analyzing.');
            return;
        }

        setValidationError('');
        onSubmit(cv, jobDescription);
    }

    function handleAnalyzeJobOnly() {
        if (!jobDescription.trim()) {
            setValidationError('Please paste a job description first.');
            return;
        }

        setValidationError('');
        onAnalyzeJobOnly(jobDescription);
    }

    async function handleFileUpload(e) {
        const file = e.target.files[0];
        if (!file) return;

        setIsExtracting(true);
        setValidationError('');

        try {
            const extractedText = await extractCvFromFile(file);
            setCv(extractedText);
        } catch (err) {
            setValidationError(err.message);
        } finally {
            setIsExtracting(false);
            e.target.value = '';
        }
    }

    return (
        <form className="analyze-form" onSubmit={handleSubmit}>
            <div className="form-field">
                <div className="form-field-header">
                    <label htmlFor="cv">Your CV</label>
                    <label className="file-upload-label">
                        {isExtracting ? 'Extracting...' : 'Upload PDF/DOCX'}
                        <input
                            type="file"
                            accept=".pdf,.docx"
                            onChange={handleFileUpload}
                            disabled={isExtracting}
                            hidden
                        />
                    </label>
                </div>
                <textarea
                    id="cv"
                    value={cv}
                    onChange={(e) => setCv(e.target.value)}
                    placeholder="Paste your CV text here, or upload a file above..."
                    rows={12}
                />
            </div>

            <div className="form-field">
                <label htmlFor="jobDescription">Job Description</label>
                <textarea
                    id="jobDescription"
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    placeholder="Paste the job description here..."
                    rows={12}
                />
            </div>

            {validationError && <p className="form-error">{validationError}</p>}

            <button type="submit" disabled={isLoading}>
                {isLoading ? 'Analyzing...' : 'Analyze Fit'}
            </button>

            <button
                type="button"
                className="secondary-button"
                onClick={handleAnalyzeJobOnly}
                disabled={isAnalyzingJob}
            >
                {isAnalyzingJob ? 'Analyzing...' : 'Analyze Job Requirements Only'}
            </button>
        </form>
    );
}