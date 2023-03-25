const mongoose = require("mongoose");

const noteSchema = mongoose.Schema({
    title: String,
    message: String,
    author: String,
    userID: String
})

const NotesModel = mongoose.model("note", noteSchema);

module.exports = NotesModel
