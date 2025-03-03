import type { NextApiRequest, NextApiResponse } from "next";
import * as jwt from "jsonwebtoken"; // JSON Web Token import edildi

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Yetkisiz erişim" });
    }

    const token = authorization.split(" ")[1];

    try {
        const decoded = jwt.verify(token, "your_secret_key"); // Token doğrulama
        res.status(200).json({ user: decoded });
    } catch (error) {
        res.status(401).json({ message: "Geçersiz token" });
    }
}
