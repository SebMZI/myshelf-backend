import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";
import User from "../models/user.models.js";

/**
 * Middleware d'authentification qui vérifie la présence et la validité d'un token JWT
 * Le token est attendu dans un cookie nommé 'jwt' ou dans l'en-tête Authorization
 */
const authorize = async (req, res, next) => {
  try {
    let token;

    console.log(req.cookies);

    // Vérifier si le token est présent dans les cookies
    if (req.cookies && req.cookies.jwt) {
      token = req.cookies.jwt;
    }
    // Fallback: vérifier si le token est présent dans l'en-tête Authorization (pour compatibilité)
    else if (
      (req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")) ||
      (req.headers.authorisation &&
        req.headers.authorisation.startsWith("Bearer"))
    ) {
      token =
        req.headers.authorization.split(" ")[1] ||
        req.headers.authorisation.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ message: "Non autorisé - Token manquant" });
    }

    // Vérifier et décoder le token
    const decodedToken = jwt.verify(token, JWT_SECRET);

    // Récupérer l'utilisateur associé au token
    const user = await User.findById(decodedToken.userId);

    if (!user) {
      return res
        .status(401)
        .json({ message: "Non autorisé - Utilisateur non trouvé" });
    }

    // Ajouter l'utilisateur à l'objet request pour une utilisation ultérieure
    req.user = user;
    next();
  } catch (error) {
    // Gérer les erreurs de vérification du token
    res.status(401).json({
      error: error.message,
      message: "Non autorisé - Token invalide ou expiré",
    });
  }
};

export default authorize;
