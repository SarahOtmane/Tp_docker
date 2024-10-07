const argon2 = require('argon2');
require('dotenv').config();

const User = require('../models/userModel');

exports.registerAUser = async(req, res) =>{
    try {
        const { email, password } = req.body;

        // Check for missing fields
        if (!email || !password) {
            return res.status(403).json({ message: 'Tous les champs sont requis.' });
        }

        // Check for valid email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(403).json({ message: 'Format d\'email invalide.' });
        }

        // Vérification de l'existence de l'email
        const existingEmail = await User.findOne({ where: { email } });
        if (existingEmail) {
            return res.status(409).json({ message: 'Cet email existe déjà.' });
        }

        // Hachage du mot de passe
        const hashedPassword = await argon2.hash(password);

        // Création de l'utilisateur
        const newUser = new User({
            email: email,
            password: hashedPassword,
        });
        await newUser.save();

        res.status(201).json({ message: `Utilisateur créé avec succès.`});
    } 
    catch (error) {
        res.status(500).json({ message: 'Erreur lors de la création de l\'utilisateur.' });
    }
};