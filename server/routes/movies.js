const router = require("express").Router();
const Movie = require("../mongoDB/movie");
const verifyjwt = require("../verifyJWT");

//Tạo mới
router.post("/", verifyjwt, async (req, res) => {
  if (req.user.isAdmin) {
    const newMovie = new Movie(req.body);
    try {
      const savedMovie = await newMovie.save();
      res.status(201).json(savedMovie);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("Không được phép upload phim mới");
  }
});

//UPDATE

router.put("/:id", verifyjwt, async (req, res) => {
    try {
      const updatedMovie = await Movie.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedMovie);
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

//DELETE

router.delete("/:id", verifyjwt, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      await Movie.findByIdAndDelete(req.params.id);
      res.status(200).json("Phim đã được xóa");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("Bạn không được phép");
  }
});

//GET

router.get("/find/:id", verifyjwt, async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    res.status(200).json(movie);
  } catch (err) {
    res.status(500).json(err);
  }
});


//GET ALL

router.get("/", verifyjwt, async (req, res) => {

    try {
      const movies = await Movie.find();
      res.status(200).json(movies.reverse());
    } catch (err) {
      res.status(500).json(err);
    }

});

module.exports = router;