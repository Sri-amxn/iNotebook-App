const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');
// ROUTE 1: get all the notes using :GET "/api/auth/getuser".  login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id })
        res.json(notes)
    } catch (error) {

        console.error(error.message);
        res.status(500).json("Internal server error");

    }
})
// ROUTE 2: Add a new note using :POST "/api/note/addnote".  login required
router.post('/addnote', fetchuser,[
    body('title', 'Enter a valid title').isLength({ min: 3 }),
   body('description', 'description must be atleast 5 characters long').isLength({ min: 5 }),], async (req, res) => {
        try {
            console.log(req.body);
            const { title, description, tag } = req.body;

            // if there are errors, return bad requests and the errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const note = new Note({
                title, description, tag, user: req.user.id
            })
            const savedNote = await note.save()
            res.json(savedNote)
        } catch (error) {

            console.error(error.message);
            res.status(500).json("Internal server error");

        }
    })

// ROUTE 3: Update an existing note using :PUT "/api/note/addnote".  login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    try {


        // create new note object
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        // find the note to be updated and update it
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(400).send("Note not found") }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed");

        }

        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note });
    } catch (error) {

        console.error(error.message);
        res.status(500).json("Internal server error");

    }

})
// ROUTE 4: Delete an existing note using :DELETE "/api/note/deletenote".  login required
router.delete('/deletenote/:id', fetchuser, [], async (req, res) => {
    // const { title, description, tag } = req.body;
    try {


        // find the note to be deleted and delete it
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(400).send("Note not found") }

        // allow deletion only if user owns this note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed");

        }

        note = await Note.findByIdAndDelete(req.params.id)

        res.json({ "Success": "Note has been deleted", note: note });
    } catch (error) {

        console.error(error.message);
        res.status(500).json("Internal server error");

    }

})
module.exports = router;