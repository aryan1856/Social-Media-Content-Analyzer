import { PDFParse } from 'pdf-parse';
import Tesseract from "tesseract.js";

const extractText = async (url, mimetype) => {
    try {
        if (mimetype === "application/pdf") {
            const parser = new PDFParse({ url: url });
            const result = await parser.getText();
            return result;
        } else {
            const result = await Tesseract.recognize(url, "eng");

            const extracted = result?.data?.text?.trim() || "";

            return { text: extracted };
        }
    } catch (error) {
        console.log(`Error extracting text ${error}`);
        return { text: "no readable text detected" };
    }
}

export default extractText;