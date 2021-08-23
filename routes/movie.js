const router = require('express').Router();

const { validatePostMovie, validateDeleteMovie } = require('../middlewares/validate');

const {
  getMovies, postMovie, deleteMovie,
} = require('../controllers/movie');

router.get('/movies', getMovies);
router.post('/movies', validatePostMovie, postMovie);

router.delete('/movies/:_id', validateDeleteMovie, deleteMovie);

module.exports = router;
