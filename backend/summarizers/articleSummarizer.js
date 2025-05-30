const { GoogleGenerativeAI } = require('@google/generative-ai');
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function generateArticle (article, headline) {
    try {
        article = article.slice(0, 8000);
        const model = genAI.getGenerativeModel({ model:"gemini-2.0-flash" });
        const prompt = `Summarize the article in 250 words (use small paragraphs breakdown), if no article give summary on the basis of the headline (Do not mention headline) : ${headline} \n ${article}`;
        const result = await model.generateContent(prompt);
        let summary = result.response.text();
        console.log(summary);
        return (summary);
    }
    catch (error) {
        console.error("Gemini summarization error:", error.message);
        return article;
    }
}

module.exports = generateArticle;
