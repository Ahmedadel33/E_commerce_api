const express = require("express");
const router = express.Router();
const multer = require("multer");
const { protect, admin } = require("../middleware/auth");
const {
  productValidation,
  updateProductValidation,
} = require("../validation/productvalid");
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const safeName = file.originalname
      .replace(/\s+/g, "-")
      .replace(/[^a-zA-Z0-9.-]/g, "");
    cb(null, `${Date.now()}-${safeName}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (allowedTypes.includes(file.mimetype)) {
      return cb(null, true);
    }
    cb(new Error("Only image files are allowed"));
  },
});
router.get("/", getProducts);
router.get("/:id", getProductById);
router.post(
  "/",
  protect,
  admin,
  upload.single("image"),
  productValidation,
  createProduct,
);
router.put(
  "/:id",
  protect,
  admin,
  upload.single("image"),
  updateProductValidation,
  updateProduct,
);
router.delete("/:id", protect, admin, deleteProduct);
router.post("/upload", protect, admin, upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  res.json({
    message: "File uploaded successfully",
    filename: req.file.filename,
  });
});

module.exports = router;
