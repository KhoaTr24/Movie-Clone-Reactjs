const router = require("express").Router();
const List = require("../mongoDB/list");
const verifyjwt = require("../verifyJWT");

//CREATE

router.post("/", verifyjwt, async (req, res) => {
  if (req.user.isAdmin) {
    const newList = new List(req.body);
    try {
      const savedList = await newList.save();
      res.status(201).json(savedList);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("Bạn không được phép");
  }
});


//UPDATE
router.put("/:id", verifyjwt, async (req, res) => {
  if (req.user.isAdmin) {
    const updateList = new List(req.body);
    try {
      const savedList = await updateList.save();
      res.status(201).json(savedList);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("Bạn không được phép");
  }
});

//DELETE

router.delete("/:id", verifyjwt, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      await List.findByIdAndDelete(req.params.id);
      res.status(201).json("List đã được xóa!");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("Bạn không được phép");
  }
});

//GET

router.get("/", verifyjwt, async (req, res) => {
  const typeQuery = req.query.type;
  const genreQuery = req.query.genre;
  let list = [];
  try {
    if (typeQuery) {
      if (genreQuery) {
        list = await List.aggregate([
          { $sample: { size: 10 } },
          { $match: { type: typeQuery, genre: genreQuery } },
        ]);
      } else {
        list = await List.aggregate([
          { $sample: { size: 10 } },
          { $match: { type: typeQuery } },
        ]);
      }
    } else {
      list = await List.aggregate([{ $sample: { size: 10 } }]);
    }
    res.status(200).json(list);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;