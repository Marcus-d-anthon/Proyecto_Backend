const User = require('../models/User');
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken');

// Crear nuevo usuario
const createUser = async (req, res) => {
const { name, email, password } = req.body;
if (!name || !email || !password) {
    return res.status(400).json({ message: 'Faltan datos requeridos' });
}
const userExists = await User.findOne({ email: email.toLowerCase() });
if (userExists) 
    return res.status(400).json({ message: 'Usuario ya existe' }
);

const salt = await bcrypt.genSalt(10);
const hashed = await bcrypt.hash(password, salt);

const user = await User.create({ name, email: email.toLowerCase(), password: hashed });
if (user) {
    res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id)
    });
} else {
    res.status(400).json({ message: 'Error al crear usuario' });
}
};


// Listar todos los usuarios
const getUsers = async (req, res) => {
const users = await User.find().select('-password');
res.json(users);
};


// Obtener Usuario por email
const getUserByEmail = async (req, res) => {
const email = req.params.email.toLowerCase();
const user = await User.findOne({ email }).select('-password');

if (!user) 
    return res.status(404).json({ message: 'Usuario no encontrado' });

res.json(user);
};


// Actualizar Usuario por id
const updateUser = async (req, res) => {
const { id } = req.params;
const updates = { ...req.body };
if (updates.password) {
    const salt = await bcrypt.genSalt(10);
    updates.password = await bcrypt.hash(updates.password, salt);
}
const user = await User.findByIdAndUpdate(id, updates, { new: true }).select('-password');

if (!user) 
    return res.status(404).json({ message: 'Usuario no encontrado' });

res.json(user);
};


// Eliminar Usuario por id
const deleteUser = async (req, res) => {
const { id } = req.params;
const user = await User.findByIdAndDelete(id);

if (!user) 
    return res.status(404).json({ message: 'Usuario no encontrado' });

res.json({ message: 'Usuario eliminado' });

};


// Login del User
const loginUser = async (req, res) => {
const { email, password } = req.body;
const user = await User.findOne({ email: email.toLowerCase() });

if (!user) 
    return res.status(401).json({ message: 'Credenciales inválidas' });

const isMatch = await bcrypt.compare(password, user.password);

if (!isMatch) 
    return res.status(401).json({ message: 'Credenciales inválidas' });

res.json({ _id: user._id, name: user.name, email: user.email, token: generateToken(user._id) });
};


module.exports = { createUser, getUsers, getUserByEmail, updateUser, deleteUser, loginUser };