function CoverLetter({ coverLetter }) {

    if (!coverLetter) return null;

    const copyText = () => {
        navigator.clipboard.writeText(coverLetter);
        alert("Cover Letter Copied!");
    };

    return (
        <div className="result">

            <h2>Generated Cover Letter</h2>

            <textarea
                readOnly
                value={coverLetter}
                rows="15"
            />

            <button onClick={copyText}>
                Copy
            </button>

        </div>
    );
}

export default CoverLetter;