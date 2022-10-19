const express = require('express')
const app = express()

app.use(express.json())

const artists = require('./artists.json')
const records = require('./records.json')

const createErrors = (res, status, error) => {
    return res.status(status).json(error)
}

const errors = {
    invalidId: 'Invalid id',
    unknownArtist: 'Artist doesn\'t exist',
    missingInformation: 'You must provide a name and an id',
}


const getElements = (req, res, datas) => {
    res.status(200).json(datas)
}

const getElement = (req, res, datas) => {
    const id = Number(req.params.id)
    if (!id) {
        createErrors(res, 400, errors.invalidId)
        return
    }
    const element = datas.find((data) => data.id === id)
    if (!element) {
        createErrors(res, 404, errors.unknownArtist)
    }
    res.status(200).json(element)
}

const addElement = (req, res, datas) => {
    const id = Number(req.body.id)
    if (!id) {
        createErrors(res, 400, errors.invalidId)
        return
    }
    const existingData = datas.find((data) => data.id === req.body.id)
    if (existingData) {
        createErrors(res, 404, errors.unknownArtist)
    }
    else if (!(req.body.id && req.body.name)) {
        createErrors(res, 401, errors.missingInformation)
    }
    else {
        datas.push(req.body)
        res.status(200).json('Added successfully')
    }
}

const editElement = (req, res, datas) => {
    const id = Number(req.params.id)
    if (!id) {
        createErrors(res, 400, errors.invalidId)
        return
    }
    let element = datas.find(data => data.id === id)
    if (!element) {
        createErrors(res, 404, errors.unknownArtist)
    }
    else {
        const keys = Object.keys(req.body)
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            element[key] = req.body[key]
        }
        res.status(200).json(DataTransfer)
    }
}

const deleteElement = (req, res, datas) => {
    const id = Number(req.params.id)
    if (!id) {
        createErrors(res, 400, errors.invalidId)
    }
    const indexElement = datas.findIndex((data) => data.id === id)
    if (indexElement === -1) {
        createErrors(res, 404, errors.unknownArtist)
    }
    else {
        datas.splice(indexElement, 1)
        res.status(200).json('Deleted successfully')
    }
}

// Artists

app.get('/artists', (req, res) => {
    getElements(req, res, artists)
})

app.get('/artists/:id', (req, res) => {
    getElement(req, res, artists)
})

app.post('/artists', (req, res) => {
    addElement(req, res, artists)
})

app.put('/artists/:id', (req, res) => {
    editElement(req, res, artists)
})

app.delete('/artists/:id', (req, res) => {
    deleteElement(req, res, artists)
})


// Records
app.get('/records', (req, res) => {
    getElements(req, res, records)
})

app.get('/records/:id', (req, res) => {
    getElement(req, res, records)
})

app.post('/records', (req, res) => {
    addElement(req, res, records)
})

app.put('/records/:id', (req, res) => {
    editElement(req, res, records)
})

app.delete('/records/:id', (req, res) => {
    deleteElement(req, res, records)
})


app.listen(3005, () => {
    console.log('Serveur à l\'écoute')
})