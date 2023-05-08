const router = require("express").Router();
const User = require("../mongoDB/user");
const verifyjwt = require("../verifyJWT");
const CryptoJS = require("crypto-js");



//Create

router.post("/", verifyjwt, async (req, res) => {
  if (req.user.isAdmin) {
    const newUser = new User({
      username:req.body.username,
      email:req.body.email,
      password: CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString()
    });
    try {
      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("Không được phép tạo tk");
  }
});

//Chỉnh sửa
router.put("/:id", verifyjwt, async (req, res) => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(
          req.body.password,
          process.env.SECRET_KEY
        ).toString();
      }
      try {
        const updatedUser = await User.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedUser);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("Bạn chỉ có thể cập nhật tài khoản của bạn");
    }
  });
  
  //Xóa
  router.delete("/:id", verifyjwt, async (req, res) => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("Người dùng đã được xóa");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("Bạn chỉ có thể xóa tài khoản của mình");
    }
  });
  
  //Lấy TK
  
  router.get("/find/:id", async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      const { password, ...info } = user._doc;
      res.status(200).json(info);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  //Lấy tất cả tài khoản trong MongoDB
  router.get("/", verifyjwt, async (req, res) => {
    const query = req.query.new;
    if (req.user.isAdmin) {
      try {
        const users = query
          ? await User.find().sort({ _id: -1 }).limit(5)
          : await User.find();
        res.status(200).json(users);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("Bạn không được phép xem tất cả người dùng");
    }
  });
  
  //Lấy thông tin tạo tk
  router.get("/stats", async (req, res) => {
    const today = new Date();
    const latYear = today.setFullYear(today.setFullYear() - 1);
  
    try {
      const data = await User.aggregate([
        {
          $project: {
            month: { $month: "$createdAt" },
          },
        },
        {
          $group: {
            _id: "$month",
            total: { $sum: 1 },
          },
        },
      ]);
      res.status(200).json(data)
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  module.exports = router;

