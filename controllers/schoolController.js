const School = require('../models/School');
const multer = require('multer');
const shortid = require('shortid');
const Stripe = require('stripe');

const configuracionMulter = {
    storage: multer.memoryStorage(),
    fileFilter(req, file, cb) {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true);
        } else {
            cb(new Error());
        }
    },
}

const upload = multer(configuracionMulter).single('logo');
exports.newSchool = async (req, res) => {
    upload(req, res, async function (error) {
        try {
            const { name, email, subdomain, publicKey, secretKey } = req.body;
            if (!name) {
                return res.status(400).json({ msg: 'El nombre es obligatorio' });
            }
            if (!email) {
                return res.status(400).json({ msg: 'El email es obligatorio' });
            }
            if (!subdomain) {
                return res.status(400).json({ msg: 'El subdominio es obligatorio' });
            }
            if (!publicKey) {
                return res.status(400).json({ msg: 'La llave publica es obligatorio' });
            }
            if (!secretKey) {
                return res.status(400).json({ msg: 'La llave secreta es obligatorio' });
            }
            if (!req.file) {
                return res.status(400).json({ msg: 'El logo es obligatorio' });
            }

            let user = await School.findOne({ email });
            if (user) {
                return res.status(400).json({ msg: 'El usuario ya existe' })
            }
            user = new School(req.body);
            user.logo = req.file.buffer.toString('base64');
            await user.save();
            res.json({ msg: 'Escuela creada exitosamente' });
        } catch (error) {
            console.log(error)
        }
    })
}

exports.getSchool = async (req, res) => {
    try {
        const school = await School.findOne({ subdomain: req.params.subdomain });
        if (!school) {
            return res.status(404).json({ msg: 'Escuela no encontrada' });
        }
        res.json(school)
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Hubo un error' })
    }
}

exports.checkout = async (req, res) => {
    const school = await School.findOne({ subdomain: req.params.subdomain });
    if (!school) {
        return res.status(404).json({ msg: 'Escuela no encontrada o secretKey incorrecto' });
    }

    const stripe = new Stripe(school.secretKey);
    
    try {
      const {id, amount, description} = req.body;
      const payment = await stripe.paymentIntents.create({
        amount,
        currency: "PEN",
        description,
        payment_method: id,
        confirm: true
      })
      
      res.json({ msg: 'Pago exitosamente' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Hubo un error' })
    }
}