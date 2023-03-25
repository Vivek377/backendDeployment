const express = require("express");
const NotesModel = require("../models/notes.model");
const jwt = require("jsonwebtoken");

const notesRoutes = express.Router();

notesRoutes.get("/", async (req, res) => {
    const token  = req.headers.authorization;
    const decoded = jwt.verify(token, "secret");
    try {
        if (decoded) {
            const notes = await NotesModel.find({ "userID": decoded.userID });
            res.status(200).send(notes);
        } else {
            res.status(400).send({ err: "no note found from this user" });
        }

    } catch (e) {
        console.log(e);
        res.status(400).send({ err: e.message });
    }
})

notesRoutes.post("/add", async (req, res) => {
    try {
        const note = new NotesModel(req.body);
        await note.save();
        res.status(200).send({ msg: "note saved" });
    } catch (e) {
        console.log(e);
        res.status(400).send({ err: e.message })
    }
})

notesRoutes.patch("/edit/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const payload = req.body;
        await NotesModel.findByIdAndUpdate({ _id: id }, payload);
        res.status(200).send({ msg: "note edited" });
    } catch (e) {
        console.log(e);
        res.status(400).send({ err: e.message });
    }
})

notesRoutes.delete("/delete/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await NotesModel.findByIdAndDelete({ _id: id });
        res.status(200).send({ msg: "note deleted" });
    } catch (e) {
        console.log(e);
        res.status(400).send({ err: e.message })
    }
})

module.exports = notesRoutes;
