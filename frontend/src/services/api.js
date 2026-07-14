const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export async function analyzeCvFit(cv, jobDescription) {
    const response = await fetch(`${API_BASE_URL}/api/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cv, jobDescription }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || 'Something went wrong. Please try again.');
    }

    return data;
}

export async function extractCvFromFile(file) {
    const formData = new FormData();
    formData.append('cvFile', file);

    const response = await fetch(`${API_BASE_URL}/api/extract-cv`, {
        method: 'POST',
        body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || 'Failed to extract text from file.');
    }

    return data.text;
}
export async function analyzeJobRequirements(jobDescription) {
    const response = await fetch(`${API_BASE_URL}/api/analyze-job`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobDescription }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || 'Something went wrong. Please try again.');
    }

    return data;
}