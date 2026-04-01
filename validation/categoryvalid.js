const joii = require('joi');

const categoryValidation = (req, res, next) => {
  const schema = joii.object({
    name: joii.string().min(3).max(30).required(),
    description: joii.string().max(255).optional(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

module.exports = { categoryValidation };