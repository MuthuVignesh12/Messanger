import jwt from "jsonwebtoken";
import config from "../constants/config";


const generateTokenAndSetCookie = (userId: string, res: any) => {
  const token = jwt.sign({ userId }, config.jwtSecret, {
    expiresIn: "15d"
  })

  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
    secure: !config.isDev
  })
}

export default generateTokenAndSetCookie;