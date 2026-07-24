const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const generateCoverLetter = async (req, res) => {
  try {
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

    // Format date
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
5. NEVER use placeholders such as:
   [Your Address]
   [Date]
   [Company Address]
   [City]
6. Use ONLY the supplied information.
7. If any field is empty, simply omit it.
8. Cover letter should be between 350 and 450 words.
9. Mention the candidate's skills naturally.
10. Relate the experience to the position.
11. Sound professional and confident.
12. Return ONLY the cover letter.

Format exactly like this:

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
            "You are an expert HR recruiter. Always use only the user's supplied information. Never invent names, companies, addresses, dates, or placeholders.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    return res.status(200).json({
      success: true,
      coverLetter: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error("Groq Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to generate cover letter.",
    });
  }
};

module.exports = {
  generateCoverLetter,
};