import { useState } from "react";
import Form from "../components/Form";
import Output from "../components/Output";

const Home = () => {
  const [coverLetter, setCoverLetter] = useState("");

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "40px auto",
        padding: "30px",
        background: "#fff",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "30px",
        }}
      >
        AI Cover Letter Generator
      </h1>

      <Form setCoverLetter={setCoverLetter} />

      {coverLetter && (
        <>
          <hr style={{ margin: "40px 0" }} />

          <h2>Generated Cover Letter</h2>

          <Output coverLetter={coverLetter} />
        </>
      )}
    </div>
  );
};

export default Home;