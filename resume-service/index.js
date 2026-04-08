const express = require("express");
const app = express();

app.use(express.json());

const skillsList = [
  "React",
  "Node.js",
  "MongoDB",
  "Express",
  "JavaScript",
  "API",
  "SQL",
  "Git"
];

app.post("/analyze", (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({
        status: "error",
        message: "No resume text provided"
      });
    }

    const missingSkills = skillsList.filter(skill =>
      !text.toLowerCase().includes(skill.toLowerCase())
    );

    const score = Math.max(0, 100 - missingSkills.length * 10);

    let suggestions = [];

    if (missingSkills.includes("React")) {
      suggestions.push("Add React projects");
    }

    if (missingSkills.includes("Node.js")) {
      suggestions.push("Add backend experience");
    }

    if (missingSkills.includes("API")) {
      suggestions.push("Mention API work");
    }

    if (missingSkills.length > 4) {
      suggestions.push("Add more relevant skills");
    }

    res.json({
      status: "success",
      message: "Resume analyzed successfully",
      data: {
        score,
        missingSkills,
        suggestions
      }
    });

    console.log("Analysis completed:", { score, missingSkills });

  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal server error"
    });
  }
});

app.listen(3004, () => {
  console.log("Analysis service running on 3004");
});