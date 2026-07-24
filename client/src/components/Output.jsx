import { jsPDF } from "jspdf";

const Output = ({ coverLetter }) => {
  if (!coverLetter) return null;

  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.setFont("times", "normal");
    doc.setFontSize(12);

    const lines = doc.splitTextToSize(coverLetter, 180);

    doc.text(lines, 15, 20);

    doc.save("Cover_Letter.pdf");
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(coverLetter);
    alert("Cover letter copied!");
  };

  return (
    <div
      style={{
        marginTop: "30px",
        padding: "25px",
        border: "1px solid #ddd",
        borderRadius: "10px",
        background: "#fafafa",
      }}
    >
      <h2>Generated Cover Letter</h2>

      <div style={{ marginBottom: "20px" }}>
        <button
          onClick={copyToClipboard}
          style={{
            padding: "10px 20px",
            marginRight: "10px",
            cursor: "pointer",
          }}
        >
          Copy
        </button>

        <button
          onClick={downloadPDF}
          style={{
            padding: "10px 20px",
            cursor: "pointer",
          }}
        >
          Download PDF
        </button>
      </div>

      <pre
        style={{
          whiteSpace: "pre-wrap",
          fontFamily: "Times New Roman",
          fontSize: "15px",
          lineHeight: "1.8",
          padding: "20px",
          background: "#fff",
          borderRadius: "8px",
          border: "1px solid #ccc",
          overflowX: "auto",
        }}
      >
        {coverLetter}
      </pre>
    </div>
  );
};

export default Output;