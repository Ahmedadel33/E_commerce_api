const joii= require('joi');

const registerValidation = (req, res, next) => {
    const schema = joii.object({
        name: joii.string().min(3).max(30).required(),
        email: joii.string().email().required(),
        password: joii.string().min(6).required()
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({
            message: error.details[0].message
        })  ;
    }
    next();
};

const loginValidation = (req, res, next) => {
    const schema = joii.object({
        email: joii.string().email().required(),        
        password: joii.string().min(6).required()
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({
            message: error.details[0].message
        });
    }
    next();
};


module.exports = { registerValidation, loginValidation };


