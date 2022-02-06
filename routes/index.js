const express = require('express');
const router = express.Router();
const schoolController = require('../controllers/schoolController');

module.exports = function () {
    //Crea una nueva escuela
    router.post('/api/new-school',
        schoolController.newSchool,
    );
    //Obtiene la escuela por su subdominio
    router.get('/api/:subdomain',
        schoolController.getSchool,
    )
    //Realizar el pago a stripe
    router.post('/api/:subdomain/checkout',
        schoolController.checkout,
    );
    return router;
}