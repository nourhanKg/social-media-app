import jwt from "jsonwebtoken";
const verifyToken = async function (req, res, next) {
  try {
    let token = req.header("Authorization");
    console.log(req.header("Authorization"));
    console.log(token);
    if (!token) {
      return res.status(403).send("Access Denied");
    }
    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }
    const verifiedUser = jwt.verify(token, process.env.JWT_SECRET);
    console.log(verifiedUser);
    req.user = verifiedUser;
    next();
  } catch (err) {
    res.status(500).json({
      status: "fail",
      error: err.message,
    });
  }
};
export default verifyToken;
