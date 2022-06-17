const JWT = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = req.headers?.authorization?.split(" ")[1] || null;
  if (token === null)
    return res
      .status(401)
      .send({ error: "You must be logged in to do this." });
  JWT.verify(token, "secretAccess", (err, user) => {
    
    if (err) return res.status(400).send({ error: err });
    req.userid = user.dataValues.id;
    req.teamid=user.dataValues.team_id
    next();
  });
};

module.exports = authenticateToken;