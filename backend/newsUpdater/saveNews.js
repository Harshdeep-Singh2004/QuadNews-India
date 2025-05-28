const fetchHeadlinesArticles = require('../fetcher/fetcher');
const News = require('../models/news.model')

const saveArticles = async () => {
    try {
        const response = await fetchHeadlinesArticles();
        for (const genre of Object.keys(response)) {
            const articles = response[genre];
            
            await News.deleteMany({genre});
            const newsDocs = articles.map(article => ({
                genre,
                headline: article.headline,
                article: article.article,
                link: article.link,
                createdOn: new Date().getTime(),
            }));
            await News.insertMany(newsDocs);
            console.log(`✅ saved ${newsDocs.length} article for genre: ${genre}`);
        }
        console.log('✅ All articles saved in MongoDB.');
    }
    catch (err) {
        console.error('❌ Failed to fetch or save news:', err);
    }
}

module.exports = saveArticles;