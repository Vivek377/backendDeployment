const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/users.routes");
const connection = require("./db");
const notesRoutes = require("./routes/notes.routes");
const authenicate = require("./middleware/auth.middleware");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());
app.use("/users", userRoutes);
app.use(authenicate);
app.use("/notes", notesRoutes);

app.listen(process.env.port, async (req, res) => {
    try {
        await connection;
        console.log("connected to backend");
    } catch (e) {
        console.log("Cannot connect to DB")
        console.log(e);
        res.status(400).send({ err: e.message });
    }
})

