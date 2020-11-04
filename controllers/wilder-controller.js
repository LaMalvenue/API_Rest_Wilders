const { WilderModel } = require('../models/wilder-model');

module.exports = {

    read: (req, res) => {
        WilderModel
            .findOne({ name: req.params.name })
            .then((result) => res.status(200).json({ result }))
            .catch(error => res.status(400).json({ error }))
    },

    readAll: (req, res) => {
        WilderModel
            .find()
            .then(result => res.status(200).json({ result }))
            .catch(error => res.status(400).json({ error }))
    },

    create: (req, res) => {
        WilderModel
            .init()
            .then(() => {
                const newWilder = new WilderModel (req.body);
                
                newWilder
                    .save()
                    .then((result) => {
                        res.json({ success: true, result: result });
                        console.log('Wilder enregistré');
                    })
                    .catch((err) => {
                        res.json({ success: false, result: err });
                        console.log('Wilder non enregistré');
                    });
            });
    },

    update: (req, res) => {
        WilderModel
            .findByIdAndUpdate(req.params.id, req.body)
            .then(() => res.status(200).json({ success: true, message: "Wilder mis à jour"}))
            .catch(error => res.status(400).json({ error }))
    },

    delete: (req, res) => {
        WilderModel
            .deleteOne({ name: req.params.name })
            .then(() => res.status(200).json({ success: true, message: "Wilder supprimé"}))
            .catch(error => res.status(400).json({ error }))
    }

}