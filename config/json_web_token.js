// generate the json web token for the auth 
import jwt from "jsonwebtoken";
// baad me env me karunga ise

// logic for setting up the refresh token and the access token
const ACCESS_TOKEN_SECRET = "access-token-secret-key";
const REFRESH_TOKEN_SECRET = "refresh-token-secret-key";

const jwtToken = (userId, res) => {
    const accessToken = jwt.sign({userId},ACCESS_TOKEN_SECRET , {expiresIn: "15m"});
    const refreshToken = jwt.sign({userId},REFRESH_TOKEN_SECRET,{expiresIn: "30d"});

    return {accessToken , refreshToken};
};

export default jwtToken;