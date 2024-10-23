import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']; // Le token devrait être passé dans l'en-tête Authorization
  if (!token) {
    return res.status(403).json({ message: 'Accès interdit, token manquant' });
  }

  try {
    // Décoder et vérifier le token
    const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET); // Token est souvent précédé de "Bearer "
    req.utilisateur = decoded; // Stocage des données décodées (comme l'ID utilisateur)
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token invalide ou expiré' });
  }
};
