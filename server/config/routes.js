const db = require('../data/dbConfig');

module.exports = server => {
    server.get('/', test);
    server.get('/api/notes', getAllNotes);
    server.post('/api/notes', createNote);
    server.get('/api/notes/:id', getNoteById);
    server.put('/api/notes/:id', editNote);
    server.delete('/api/notes/:id', deleteNote);   
   
};

function test (req, res) {
    res.send('<h1>Rock-n-Roll!!</h1>');
};

{/*===== GET ALL notes =====*/}
function getAllNotes (req, res) {
    db('notes').then(response => {
        res.status(200).json(response);
    }).catch(err => {
        res.status(500).json(err);
    });
};

{/*===== POST CREATE note =====*/}
function createNote (req, res) {
     const { title, content } = req.body;
     if (!title) {
         return res.status(400).json(['ERROR-dataShape:', {title: 'REQUIRED', content: 'OPTIONAL'}]).end();
     };
     const newNote = { title, content };
     db('notes')
        .insert(newNote).then(response => {
            res.status(201).json(`created! id:${response}`);
        }).catch(err => {
            res.status(500).json(err);
        });
};

{/*===== GET note =====*/}
function getNoteById (req, res) {
    const { id } = req.params;
    db('notes').where({id:id}).then(response => {
        if (response.length === 0) {
            return res.status(404).json(`ERROR: id:${id} not found!`).end();
        };
        res.status(200).json(response[0]);      
    }).catch(err => {
        res.status(500).json(err);
    });
};

{/*===== PUT EDIT note =====*/}
function editNote (req, res) {
    const { id } = req.params;
    const { title, content } = req.body;
    if (!title && !content) {
        return res.status(418).json('ERROR: bad request from user').end();
    };
    db('notes').where({id:id}).then(response => {
        if (response.length === 0) {
            return res.status(404).json(`ERROR: id:${id} not found!`).end();
        };
        const userInput = { title, content };

        db('notes').where({id:id}).update(userInput).then(response => {
            if (response === 1) {
            res.status(200).json(`SUCCESS!: id:${id} updated`);
            } else {
                return res.status(501).json(`ERROR: ${response} records changed`).end();
            };
        });
    }).catch(err => {
        res.status(500).json(err);
    });  
};

{/*===== DELETE note =====*/}
function deleteNote (req, res) {
    const { id } = req.params;
    db('notes').where({id:id}).then(response => {
        if (response.length === 0) {
            return res.status(404).json(`ERROR: id:${id} not found!`).end();
        };
        db('notes').where({id:id}).del().then(response => {
            res.status(202).json(`SUCCESS!: deleted ${response} record (id:${id})`);
        })
    }).catch(err => {
        res.status(500).json(err);
    }); 
};
