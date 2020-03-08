const mongo = require('../mixing/db')

module.exports = (app) => {
   app.get('/last-news', async (req, res) => {
      try {
         console.log('que xtutsta')
         const results = await mongo.getAllNews()
         res.status(200).json({ results });
      } catch (error) {
         console.log('error:', error)
         res.status(500).json('INTERNAL SERVER ERROR')
      }
   })

   app.post('/delete-news', async (req, res) => {
      try {
         const body = req.body
         if (!body || !body.story_id) {
            res.status(400).json('BAD REQUEST');
         }
         const results = await mongo.deleteNews(body)
         res.status(200).json({ results });
      } catch(error) {
         console.log('error:', error)
         res.status(500).json('INTERNAL SERVER ERROR')
      }
   })
};