const express = require('express');
const database = require('./database.js')

const server = express();

server.use(express.json())

const PORT = 5000;

server.listen(PORT, () => {
    console.log(`listening on http://localhost:${PORT}`)
})

server.post("/people", (req, res) => {
    const newPerson = database.createPerson({
        name: req.body.name,
        bio: req.body.bio,
    })

    if (newPerson) {
        try{
            res.status(201).json(newPerson)
        } catch {
            res.status(500).json({
                errorMessage: "a error has occured"
            })
        }
    } else {
        res.status(400).json({
            errorMessage: "both name and bio are required"
        })
    }
})

server.get("/people", (req, res) => {
    const people = database.getPeople()

    if (users) {
        res.json(people)
    } else {
        return res.status(500).json({
            errorMessage: "info could not be retrieved"
        })
    }
})

server.get("/people/:id", (req, res) => {
    const personID = req.params.person.id
    const person = database.getPersonByID(personID)

    if (person) {
        try {
            res.json(person)
        } catch {
            res.status(500).json({
                errorMessage: "could not find person info"
            })
        }
    } else {
        res.status(404).json({
            errorMessage: "could not find person"
        })
    }
})

server.delete("/people/:id", (req, res) => {
    const person = database.getPersonByID(req.params.id)

    if (person) {
        try {
            database.deletePerson(person.id)
            res.status(204).end()
        } catch {
            res.status(500).json({
                errorMessage: "cant delete this person"
            })
        }
    } else {
        res.status(404).json({
            errorMessage: "no person has this ID"
        })
    }
})

server.put("/user/:id", (req, res) => {
    const person = database.getPersonByID(req.params.id)

    if (person) {
        try {
            const updatedPerson = database.updatePerson(person.id, {
                name: req.body.name || person.name,
                bio: req.body.bio || person.bio,
            })
            res.status(200).json(updatedPerson)
        } catch (error) {
            res.status(500).json({
                errorMessage: "cant edit person"
            });
        }
    } else {
        res.status(404).json({
            errorMessage: "no person has that ID"
        })
    }
})
