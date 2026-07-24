import { useState } from "react";
import axios from "axios";

const Form = ({ setCoverLetter }) => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    date: "",
    hiringManager: "",
    company: "",
    companyAddress: "",
    companyCity: "",
    position: "",
    skills: "",
    experience: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleReset = () => {
    setFormData({
      name: "",
      address: "",
      city: "",
      date: "",
      hiringManager: "",
      company: "",
      companyAddress: "",
      companyCity: "",
      position: "",
      skills: "",
      experience: "",
    });

    setCoverLetter("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:5000/api/generate",
        formData
      );

      setCoverLetter(response.data.coverLetter);
    } catch (error) {
      console.error(error);
      alert("Failed to generate cover letter.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>

      <input
        type="text"
        name="name"
        placeholder="Your Name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="address"
        placeholder="Your Address"
        value={formData.address}
        onChange={handleChange}
      />

      <input
        type="text"
        name="city"
        placeholder="City"
        value={formData.city}
        onChange={handleChange}
      />

      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
      />

      <input
        type="text"
        name="hiringManager"
        placeholder="Hiring Manager"
        value={formData.hiringManager}
        onChange={handleChange}
      />

      <input
        type="text"
        name="company"
        placeholder="Company"
        value={formData.company}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="position"
        placeholder="Job Position"
        value={formData.position}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="companyAddress"
        placeholder="Company Address"
        value={formData.companyAddress}
        onChange={handleChange}
      />

      <input
        type="text"
        name="companyCity"
        placeholder="Company City"
        value={formData.companyCity}
        onChange={handleChange}
      />

      <textarea
        rows="5"
        name="skills"
        placeholder="Skills (Example: React, Java, Node.js)"
        value={formData.skills}
        onChange={handleChange}
        required
      />

      <textarea
        rows="5"
        name="experience"
        placeholder="Experience / Projects"
        value={formData.experience}
        onChange={handleChange}
        required
      />

      <button type="submit" disabled={loading}>
        {loading ? "Generating..." : "Generate Cover Letter"}
      </button>

      <button
        type="button"
        onClick={handleReset}
        style={{ marginLeft: "10px" }}
      >
        Reset
      </button>

    </form>
  );
};

export default Form;