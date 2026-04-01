const joii = require('joi');

const productValidation = (req, res, next) => {
  const productSchema = joii.object({
    name: joii.string().min(3).max(120).required(),
    description: joii.string().min(1).max(1000).required(),
    price: joii.number().min(0).required(),
    sale: joii.boolean(),
    category: joii.string().min(1).max(100).required(),
    image: joii.string().optional()
  });
  const { error } = productSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

const updateProductValidation = (req, res, next) => {
  const productSchema = joii.object({
    name: joii.string().min(3).max(120),
    description: joii.string().min(1).max(1000),
    price: joii.number().min(0),
    category: joii.string().min(1).max(100),
    sale: joii.boolean(),
    oldPrice: joii.number().min(0),
    image: joii.string().optional()
  });;

  const { error } = productSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

module.exports = { productValidation, updateProductValidation };
