import Insight from "../models/insight.js";
import User from "../models/user.js";
import extractText from "../utils/extract_text.js";

export const createInsight = async (req, res) => {
  try {
    const userId = req.user._id;
    const fileUrl = req.file.path;
    const mimetype = req.file.mimetype;

    console.log("Uploaded File:", req.file);

    const parseResult = await extractText(fileUrl, mimetype);

    const extractedText = parseResult?.text || "";

    const safeText =
      typeof extractedText === "string"
        ? extractedText
        : JSON.stringify(extractedText, null, 2);

    const recommendations = await generateRecommendations(safeText);

    const insight = await Insight.create({
      userId,
      originalFileUrl: fileUrl,
      extractedText: safeText,
      recommendations,
    });

    await User.findByIdAndUpdate(userId, {
      $push: { insights: insight._id },
    });

    return res.status(201).json({
      success: true,
      insight,
    });
  } catch (error) {
    console.error("Insight creation error:", error);
    return res.status(500).json({
      success: false,
      error: error.message || "Server error",
    });
  }
};

async function generateRecommendations(text) {
  return [
    "This is a sample recommendation based on extracted text.",
    "You can integrate Gemini / OpenAI later for real suggestions.",
  ];
}
