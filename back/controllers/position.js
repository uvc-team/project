const User = require("../models/user");

exports.roleChange = async (req, res, next) => {
  //요청이 boolean값으로 온것으로 가정 (매니저위임,매니저해임)
  const position = req.body.position;

  //변경할 유저
  const changeUser = req.body.userId;

  if (!changeUser) {
    return res.status(404).json({ message: "없는 정보 입니다." });
  }

  try {
    //직급 변경될 유저
    const user = await User.findOne({
      where: { userId: changeUser },
    });

    if (!user) {
      return res.status(404).json({ message: "유저가 존재하지 않습니다." });
    }
    //1 == True 0 ==False
    if (position === "1") {
      // 매니저 위임
      user.positionId = 2;
    } else if (position === "0") {
      // 매니저 해임
      user.positionId = 3;
    } else {
      return res.status(400).json({ message: "잘못된 요청입니다." });
    }

    await user.save(); // DB에 반영

    return res.json({
      message: "직급이 변경되었습니다.",
      roleChangedUserId: changeUser,
    });
  } catch (error) {
    console.error(error);
    return next(error);
  }
};
