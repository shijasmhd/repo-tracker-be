const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const { getUserDetailsById } = require("../models/user");
const jwt = require("jsonwebtoken");

const secretKey = process.env.JWT_SECRET;
const jwtOptions = {
  secretOrKey: secretKey,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};
const expiresInHours =
  (parseInt(process.env.JWT_ACCESS_EXPIRATION_HOURS) || 1) * 60 * 60;
const tokenType = "ACCESS";

const jwtVerify = async (payload, done) => {
  try {
    if (payload.type !== tokenType) {
      throw new Error("Invalid token type");
    }
    const user = await getUserDetailsById(payload.sub);
    if (!user) {
      return done(null, false);
    }
    done(null, user);
  } catch (error) {
    done(error, false);
  }
};

const createToken = async (user) => {
  const payload = {
    sub: user.id,
    type: tokenType,
  };

  return jwt.sign(payload, secretKey, { expiresIn: expiresInHours });
};

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);

module.exports = {
  jwtStrategy,
  createToken,
};
