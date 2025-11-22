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
      data : insight,
      message : "Insights generated successfully"
    });
  } catch (error) {
    console.error("Insight creation error:", error);
    return res.status(500).json({
      success: false,
      message : error.message || "Internal server error"
    });
  }
};

// dummy for now, will integrate API for analysis and generating recommendations
async function generateRecommendations(text) {
  return [
    "This is a sample recommendation based on extracted text.",
    "You can integrate Gemini / OpenAI later for real suggestions.",
  ];
}

export const getInsightsOfUser = async (req, res) => {
    try {
        const id = req.user._id;
        const user = await User.findById({_id : id});
        if(user){
            const insights = await Insight.find({userId : id});
            res.status(200).json({
                success : true,
                message : "Insights fetched successfully",
                data : insights
            })
        }
    } catch (error) {
        console.log(`Error getting user insights ${error}`);
        res.status(500).json({success : false, message : error.message});
    }
}