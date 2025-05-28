const cron = require('node-cron');
const saveArticles = require('./newsUpdater/saveNews');

// Schedule the news update every 20 minutes
cron.schedule('*/30 * * * *', async () => {
    console.log('🕒 Running scheduled news update...');
    try {
        await saveArticles();
        console.log('✅ Scheduled news update completed successfully');
    } catch (error) {
        console.error('❌ Error in scheduled news update:', error);
    }
});

// Run immediately on startup
console.log('🚀 Starting initial news fetch...');
saveArticles()
    .then(() => console.log('✅ Initial news fetch completed'))
    .catch(error => console.error('❌ Error in initial news fetch:', error)); 
