const express = require('express')
const app = express()

app.use(express.json())

const artists = require('./artists.json')

const createErrors = (res, status, error) => {
    return res.status(status).json(error)
}

const errors = {
    invalidId: 'Invalid id',
    unknownArtist: 'Artist doesn\'t exist',
    missingInformation: 'You must provide a name and an id',
}

app.get('/artists', (req, res) => {
    res.status(200).json(artists)
})

app.get('/artists/:id', (req, res) => {
    const id = Number(req.params.id)
    if (!id) {
        createErrors(res, 400, errors.invalidId)
        return
    }
    const artist = artists.find((artist) => artist.id === id)
    if (!artist) {
        createErrors(res, 404, errors.unknownArtist)
    }
    res.status(200).json(artist)
})

app.post('/artists', (req, res) => {
    const id = Number(req.body.id)
    if (!id) {
        createErrors(res, 400, errors.invalidId)
        return
    }
    const existingArtist = artists.find((artist) => artist.id === req.body.id)
    if (existingArtist) {
        createErrors(res, 404, errors.unknownArtist)
    }
    else if (!(req.body.id && req.body.name)) {
        createErrors(res, 401, errors.missingInformation)
    }
    else {
        artists.push(req.body)
        res.status(200).json(artists)
    }
})

app.put('/artists/:id', (req, res) => {
    const id = Number(req.params.id)
    if (!id) {
        createErrors(res, 400, errors.invalidId)
        return
    }
    let artist = artists.find(artist => artist.id === id)
    if (!artist) {
        createErrors(res, 404, errors.unknownArtist)
    }
    else {
        artist.name = req.body.name
        artist.type = req.body.type
        artist.description = req.body.description
        res.status(200).json(artist)
    }
})

app.delete('/artists/:id', (req, res) => {
    const id = Number(req.params.id)
    if (!id) {
        createErrors(res, 400, errors.invalidId)
    }
    const indexArtist = artists.findIndex((artist) => artist.id === id)
    if (indexArtist === -1) {
        createErrors(res, 404, errors.unknownArtist)
    }
    else {
        artists.splice(indexArtist, 1)
        res.status(200).json(artists)
    }
})

app.listen(3005, () => {
    console.log('Serveur à l\'écoute')
})