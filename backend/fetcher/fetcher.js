const axios = require('axios');
const cheerio = require('cheerio');
const generateArticle = require('../summarizers/articleSummarizer.js');

const timesofindia = 'https://timesofindia.indiatimes.com/';
const indiaToday = 'https://www.indiatoday.in/';
const businessToday = "https://www.businesstoday.in/";

const genre = {
    'trending': "news",
    'technology': "technology",
    'sports': "sports",
    'entertainment': 'entertainment',
    'business': ''
}


async function fetchHeadlinesArticles() {
    const results = {};

    ////////////////////////// Trending
    try {
        const url = timesofindia + genre['trending'];
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);

        const links = $('.HytnJ a').slice(0,3);
        const headline_article = [];

        for (let i=0; i<3; i++) {
            const element = links[i];
            const link = $(element).attr('href');
            let headline = $(element).find('.CRKrj.style_change').text().trim();
            
            try {
                const articleResponse = await axios.get(link);
                const $$ = cheerio.load(articleResponse.data);
                let article = $$('._s30J.clearfix').text().trim();
                article = await generateArticle(article);
                headline_article.push({ headline, article, link, genre:"trending" });
            } 
            catch (err) {
                console.error(`Error fetching article of trending from ${link}:`, err.message);
                headline_article.push({ headline, article:'', link, genre:"trending" });
            }
        }
        results['trending'] = headline_article;
    } 
    catch (error) {
        console.error(`Error fetching Times of India trending news:`, error.message);
        results['trending'] = { error: 'Failed to fetch headlines' };
    }

    // //////////////////////////// Technology
    try {
        const url = timesofindia + genre['technology'];
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);
        
        const links = $('.lSIdy.col_l_6.col_m_6 a').slice(5,8);
        const headline_article = [];
        
        for (let i=0; i<3; i++) {
            const element = links[i];
            const link = $(element).attr('href');
            let headline = $(element).find('span').text().trim();
            
            try {
                const articleResponse = await axios.get(link);
                const $$ = cheerio.load(articleResponse.data);
                let article = $$('._s30J.clearfix').text().trim();
                article = await generateArticle(article);
                headline_article.push({ headline, article, link, genre:"technology" });
            } 
            catch (err) {
                console.error(`Error fetching article of technoloyg from ${link}:`, err.message);
                headline_article.push({ headline, article: '', genre:"technology" });
            }
        }
        results['technology'] = headline_article;
    } 
    catch (error) {
        console.error(`Error fetching Times of India trending news:`, error.message);
        results['technology'] = { error: 'Failed to fetch headlines' };
    }


    // ////////////////////////// Sports
    try {
        const url = indiaToday + genre['sports'];
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);

        const links = $('.B1S3_B1__s3__widget__lSl3T.widgetgap .story__grid .B1S3_story__card__A_fhi h3 a').slice(0, 3);
        const headline_article = [];

        for (let i=0; i<3; i++) {
            const element = links[i];
            const headline = $(element).text().trim();
            let link = $(element).attr('href');

            try {
                const response = await axios.get(link);
                const $$ = cheerio.load(response.data);
                let article = $$('.jsx-ace90f4eca22afc7.jsx-73334835.Story_story__content__body__qCd5E.story__content__body.widgetgap p').text().trim();
                article = await generateArticle(article);
                headline_article.push({ headline, article, link, genre:"sports" });
            } 
            catch (err) {
                console.error(`Error fetching article from ${link}:`, err.message);
                headline_article.push({ headline, article: '', link, genre:"sports" });
            }
        }     
        results['sports'] = headline_article; 
    } 
    catch (error) {
        console.error(`Error fetching Times of India trending news:`, error.message);
        results['sports'] = { error: 'Failed to fetch headlines' };
    }
    
    // // //////////////////////// Entertainment
    try {
        const url = indiaToday + genre['entertainment'];
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);
        
        const links = $('h3 a').slice(0, 3);
        const headline_article = [];

        for (let i=0; i<3; i++) {
            const element = links[i];
            const headline = $(element).text().trim();
            let link = $(element).attr('href');

            try {
                const articleResponse = await axios.get(link);
                const $$ = cheerio.load(articleResponse.data);
                let article = $$('.jsx-ace90f4eca22afc7.jsx-73334835.Story_story__content__body__qCd5E.story__content__body.widgetgap p').text().trim();
                article = await generateArticle(article);
                headline_article.push({ headline, article, link, genre:"entertainment" });
            } 
            catch (err) {
                console.error(`Error fetching article from ${link}:`, err.message);
                headline_article.push({ headline, article:'', link, genre:"entertainment" });
            }
        }     
        results['entertainment'] = headline_article; 
    } 
    catch (error) {
        console.error(`Error fetching Times of India trending news:`, error.message);
        results['entertainment'] = { error: 'Failed to fetch headlines' };
    }

    // //////////////////////// Business
    try {
        const url = businessToday + genre['business'];
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);
        
        const linkA = $('h2 a').slice(0,1);
        const linkB = $('.lst_ul .lst_li h3 a').slice(1,3);
        const links = [...linkA, ...linkB];
        const headline_article = [];

        for (let i=0; i<3; i++) {
            const element = links[i];
            const headline = $(element).text().trim();
            let link = $(element).attr('href');

            try {
                const articleResponse = await axios.get(link);
                const $$ = cheerio.load(articleResponse.data);
                let article = $$('.text-formatted.field.field--name-body.field--type-text-with-summary.field__item p').text().trim();
                article = await generateArticle(article);
                headline_article.push({ headline, article, link, genre:"business" });
            } 
            catch (err) {
                console.error(`Error fetching article from ${link}:`, err.message);
                headline_article.push({ headline, article:'', link, genre:"business" });
            }
        }     
        results['business'] = headline_article; 
    } 
    catch (error) {
        console.error(`Error fetching Times of India trending news:`, error.message);
        results['business'] = { error: 'Failed to fetch headlines' };
    }


    return results;
}

module.exports = fetchHeadlinesArticles;