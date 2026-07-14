export default function ResultDisplay({ result }) {
    if (!result) return null;

    const { score, strengths, gaps, emphasize, atsKeywordMatches, atsMissingKeywords } = result;

    return (
        <div className="result-display">
            <div className="score-section">
                <span className="score-value">{score}</span>
                <span className="score-label">Match Score</span>
            </div>

            <div className="result-grid">
                <ResultList title="Strengths" items={strengths} variant="positive" />
                <ResultList title="Gaps" items={gaps} variant="negative" />
            </div>

            <ResultList title="What to Emphasize" items={emphasize} variant="neutral" />

            <div className="ats-section">
                <h3>ATS Keyword Check</h3>
                <div className="keyword-group">
                    <span className="keyword-group-label">Found:</span>
                    {atsKeywordMatches.map((kw) => (
                        <span key={kw} className="keyword-pill keyword-match">{kw}</span>
                    ))}
                </div>
                <div className="keyword-group">
                    <span className="keyword-group-label">Missing:</span>
                    {atsMissingKeywords.map((kw) => (
                        <span key={kw} className="keyword-pill keyword-missing">{kw}</span>
                    ))}
                </div>
            </div>
        </div>
    );
}

function ResultList({ title, items, variant }) {
    return (
        <div className={`result-list result-list--${variant}`}>
            <h3>{title}</h3>
            <ul>
                {items.map((item) => (
                    <li key={item}>{item}</li>
                ))}
            </ul>
        </div>
    );
}