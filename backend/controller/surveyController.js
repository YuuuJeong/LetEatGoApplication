const Food = require("../models/food");
const Prefer = require("../models/Prefer");
const CODE = require("../modules/statusCode");

const survey = {
  taste: async (req, res, next) => {
    try {
      Food.findAll({ order: "random()", limit: 60 }).then((result) => {
        return res.json({
          postList: result,
        });
      });
    } catch (error) {}
  },
  save: async (req, res, next) => {
    try {
      await Prefer.create({
        //id: ?, 사용자 id 받아오기
        foodid: req.body.id,
        score: req.body.score,
      });
      return res.json({
        statusCode: CODE.SUCCESS,
        msg: "create user successfully",
      });
    } catch (err) {
      console.error(err);
      next(err);
    }
  },
};

module.exports = survey;
