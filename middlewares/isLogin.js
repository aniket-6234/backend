const getTokenFromHeader = require("../utils/getTokenFromHeader");
const tokenVerification = require("../utils/tokenVerification");

const isLogin = (req, res, next) => {
  const token = getTokenFromHeader(req);
  const decodedUser = tokenVerification(token);
  req.userAuth = decodedUser.id
  console.log("auth: ", decodedUser)
  if (!decodedUser) {
    return res.status(401).json({ msg: "You are not logged in!" });
  }
  
  next();
};

module.exports = isLogin;
