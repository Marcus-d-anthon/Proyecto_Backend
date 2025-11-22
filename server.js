require('dotenv').config();
const express = require('express');
const connectDB = require('./config/basedatos');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;
connectDB(process.env.MONGO_URI);

app.use('/api', userRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Error en el servidor' });
});

app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));