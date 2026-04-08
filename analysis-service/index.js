const express = require("express");
const app = express();

app.use(express.json());

// Predefined skills list
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

    // 🔴 Error handling
    if (!text) {
      return res.status(400).json({
        status: "error",
        message: "No resume text provided"
      });
    }

    // 🔍 Find missing skills
    const missingSkills = skillsList.filter(skill =>
      !text.toLowerCase().includes(skill.toLowerCase())
    );

    // 📊 Calculate ATS score
    const score = Math.max(0, 100 - missingSkills.length * 10);

    // 💡 Suggestions
    let suggestions = [];

    if (missingSkills.includes("React")) {
      suggestions.push("Add React projects to your resume");
    }

    if (missingSkills.includes("Node.js")) {
      suggestions.push("Mention backend (Node.js) experience");
    }

    if (missingSkills.includes("API")) {
      suggestions.push("Highlight API development experience");
    }

    if (missingSkills.length > 4) {
      suggestions.push("Try adding more technical skills relevant to your role");
    }

    // 📦 Final response
    res.json({
      status: "success",
      message: "Resume analyzed successfully",
      data: {
        score,
        missingSkills,
        suggestions
      }
    });

    // 🧠 Logs (for debugging / interview explanation)
    console.log("Analysis completed:", {
      score,
      missingSkills
    });

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