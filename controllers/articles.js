let express = require('express')
let db = require('../models')
let router = express.Router()

// POST /articles - create a new post
router.post('/', (req, res) => {
  db.article.create({
    title: req.body.title,
    content: req.body.content,
    authorId: req.body.authorId
  })
  .then((post) => {
    res.redirect('/')
  })
  .catch((error) => {
    res.status(400).render('main/404')
  })
})

// GET /articles/new - display form for creating new articles
router.get('/new', (req, res) => {
  db.author.findAll()
  .then((authors) => {
    res.render('articles/new', { authors: authors })
  })
  .catch((error) => {
    res.status(400).render('main/404')
  })
})

// GET /articles/:id - display a specific post and its author
// router.get('/:id', (req, res) => {
//   db.article.findAll({
//     where: { id: req.params.id },
//     include: [db.comments]
//   })
//   .then((article) => {
//     console.log(db.comments)
//     if (!article) throw Error()
//     // console.log(article.comments)
//     // res.render('articles/show', { article: article, comment: comment})
//   })
//   .catch((error) => {
//     console.log(error)
//     res.status(400).render('main/404')
//   })
// })


router.post('/:id', (req, res) => {
  db.comment.create({
    author: req.body.newCommentName,
    content: req.body.newCommentContent,
    articleId: req.params.id
  })
  .then()
    res.redirect('/articles/' + req.params.id)
  
})

router.get('/:id', (req, res) => {
  db.article.findOne({
    where: { id: req.params.id },
    include: [db.comment]
  }).then(article => {
    // by using eager loading, the article model should have a comments key
    // console.log(article.comments)
    res.render('articles/show', {article: article, comments: article.comments})
  })
})

// POST /articles - create a new post
router.post('/', (req, res) => {
  db.article.create({
    title: req.body.title,
    content: req.body.content,
    authorId: req.body.authorId
  })
  .then((post) => {
    res.redirect('/')
  })
  .catch((error) => {
    res.status(400).render('main/404')
  })
})


module.exports = router