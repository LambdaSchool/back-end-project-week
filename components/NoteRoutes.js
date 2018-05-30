const Note = require('./Note');
//const { authenticate } = require('./Middleware');

module.exports = server => {
    server.post('/newnote', (req, res) => {
        const note = new Note(req.body);
        note.save()
        .then(note => res.status(201).send(note))
        .catch(err => res.status(500).send(err));
    });
    server.get('/viewnotes', (req, res) => {
        Note.find().then(notes => {
            res.status(200).json(notes);
        }).catch(err => res.status(500).json(err));
    });
    server.get('/viewnote/:id', (req, res) => {
        const { id } = req.params;
        Note.findById(id).then(note => {
            res.status(200).json(note);
        }).catch(err => res.status(500).json(err));
    });
    server.put('/editnote/:id', (req, res) => {
        const { id } = req.params;
        const { title, body } = req.body;
        const updated = { title: title, body: body }
        Note.findByIdAndUpdate(id, updated).then(
            res.status(200).json(updated)
        ).catch(err => res.status(500).send(err));
    });
    // server.post('/login', (req,res) => {
    //     const { username, password } = req.body;
    //     User.findOne({ username }).then(user => {
    //         if (user) {
    //             user.isPasswordValid(password).then(isValid => {
    //                 if (isValid) {
    //                     req.session.username = user.username;
    //                     res.send("Access Granted");
    //                 } else {
    //                     res.status(400).send("Invalid Password");
    //                 }
    //             });
    //         } else {
    //             res.status(400).send("Invalid Username");
    //         }
    //     }).catch(err => res.send(err));
    // });
    // server.get('/logout', (req, res) => {
    //     if (req.session) {
    //         req.session.destroy(function(err) {
    //             if(err) {
    //                 res.send('error logging out, did you login');
    //             } else {
    //                 res.send('Goodbye');
    //             }
    //         });
    //     }
    // });
  };