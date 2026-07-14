export default function JobAnalysisResult({ result }) {
    if (!result) return null;

    const { experienceLevel, essentialSkills, preferredSkills, keyPhrases, cvStructureSuggestions } = result;

    return (
        <div className="job-analysis-result">
            <div className="experience-level-badge">
                <span className="experience-level-label">Experience Level:</span>
                <span className="experience-level-value">{experienceLevel}</span>
            </div>

            <div className="result-grid">
                <SkillList title="Essential Skills" items={essentialSkills} variant="essential" />
                <SkillList title="Preferred Skills" items={preferredSkills} variant="preferred" />
            </div>

            <div className="ats-section">
                <h3>Key Phrases to Include</h3>
                <div className="keyword-group">
                    {keyPhrases.map((phrase) => (
                        <span key={phrase} className="keyword-pill keyword-match">{phrase}</span>
                    ))}
                </div>
            </div>

            <div className="result-list result-list--neutral">
                <h3>CV Structure Suggestions</h3>
                <ul>
                    {cvStructureSuggestions.map((item) => (
                        <li key={item}>{item}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

function SkillList({ title, items, variant }) {
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