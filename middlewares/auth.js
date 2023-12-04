import { tokenVerify } from "../src/utils/handleJwt.js";

//Verifica que si esta autorizado tenga acceso a realizar peticiones como delete
export const isAuth = async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ message: "No token provided" });
    const isValidToken = await tokenVerify(token);
    isValidToken ? next() : res.status(401).json({ message: "Invalid token" });
};