const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const generateCoverLetter = async (req, res) => {
  try {
    console.log("===== NEW REQUEST =====");
    console.log("GROQ_API_KEY exists:", !!process.env.GROQ_API_KEY);
    console.log("Request Body:", req.body);

    const {
      name,
      address,
      city,
      date,
      hiringManager,
      company,
      companyAddress,
      companyCity,
      position,
      skills,
      experience,
    } = req.body;

    const formattedDate = date
      ? new Date(date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "";

    const prompt = `
You are a professional HR recruiter and career coach.

Write an ATS-friendly cover letter using ONLY the information provided below.

=========================
CANDIDATE DETAILS
=========================
Name: ${name}
Address: ${address}
City: ${city}
Date: ${formattedDate}

=========================
COMPANY DETAILS
=========================
Hiring Manager: ${hiringManager}
Company: ${company}
Company Address: ${companyAddress}
Company City: ${companyCity}

=========================
JOB DETAILS
=========================
Position: ${position}

=========================
SKILLS
=========================
${skills}

=========================
EXPERIENCE
=========================
${experience}

=========================
IMPORTANT RULES
=========================

1. NEVER invent company names.
2. NEVER invent dates.
3. NEVER replace company names.
4. NEVER replace hiring manager names.
5. NEVER use placeholders.
6. Use ONLY the supplied information.
7. If any field is empty, simply omit it.
8. Cover letter should be between 350 and 450 words.
9. Mention the candidate's skills naturally.
10. Relate the experience to the position.
11. Sound professional and confident.
12. Return ONLY the cover letter.

Format:

${name}
${address}
${city}
${formattedDate}

${hiringManager}
${company}
${companyAddress}
${companyCity}

Dear ${hiringManager || "Hiring Manager"},

<Professional Cover Letter>

Sincerely,

${name}
`;

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      temperature: 0.5,
      max_tokens: 900,
      messages: [
        {
          role: "system",
          content:
            "You are an expert HR recruiter. Always use only the user's supplied information.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    console.log("Groq API Success");

    return res.status(200).json({
      success: true,
      coverLetter: completion.choices[0].message.content,
    });

  } catch (error) {
    console.error("========== GROQ ERROR ==========");
    console.error("Message:", error.message);

    if (error.status) {
      console.error("Status:", error.status);
    }

    if (error.response) {
      console.error("Response:", error.response.data);
    }

    console.error("Full Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to generate cover letter.",
      error: error.message,
    });
  }
};

module.exports = {
  generateCoverLetter,
};