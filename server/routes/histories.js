const router = require("express").Router();
const History = require("../mongoDB/history");
const verifyjwt = require("../verifyJWT");

//Tạo mới

router.post("/", verifyjwt, async (req, res) => {

    const newHistory = new History(req.body);
    try {
      const savedHistory = await newHistory.save();
      res.status(201).json(savedHistory);
    } catch (err) {
      res.status(500).json(err);
    }
});


//DELETE

router.delete("/:id", verifyjwt, async (req, res) => {
 
    try {
      await History.findByIdAndDelete(req.params.id);
      res.status(200).json("Phim đã được xóa");
    } catch (err) {
      res.status(500).json(err);
    }

});

//GET
router.get("/find/:id", verifyjwt, async (req, res) => {
  try {
    const history = await History.findById(req.params.id);
    res.status(200).json(history);
  } catch (err) {
    res.status(500).json(err);
  }
});


//GET ALL
router.get("/", verifyjwt, async (req, res) => {
    try {
      const Historys = await History.find();
      res.status(200).json(Historys.reverse());
    } catch (err) {
      res.status(500).json(err);
    }
});

module.exports = router;