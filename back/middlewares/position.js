const User = require("../models/user");
const Position = require("../models/position");

exports.isPresident = async (req, res, next) => {
  //토큰에서 추출한 userid로 직급검사
  const id = req.userId;
  try {
    const userRole = await User.findOne({
      where: { userId: id },
      include: [{ model: Position, as: "Position" }],
    });
    const role = userRole.Position.dataValues.role;
    if (role === "사장") {
      return next();
    } else {
      return res.status(404).json({ message: "권한이 없습니다." });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};
exports.isManager = async (req, res, next) => {
  //토큰에서 추출한 userid로 직급검사
  const id = req.userId;
  try {
    const userRole = await User.findOne({
      where: { userId: id },
      include: [{ model: Position, as: "Position" }],
    });
    const role = userRole.Position.dataValues.role;
    if (role === "매니저") {
      return next();
    } else {
      return res.status(404).json({ message: "권한이 없습니다." });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};
