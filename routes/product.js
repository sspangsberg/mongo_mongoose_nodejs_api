const router = require("express").Router();
const product = require("../models/product");
const { verifyToken } = require("../validation");

// Create new product
router.post("/", verifyToken, (req, res) => {
//router.post("/", (req, res) => {
    const data = req.body;
    product.insertMany(data)
        .then(data => { res.status(201).send(data); })
        .catch(err => { res.status(500).send({ message: err.message }); });
});

router.get("/", (req, res) => {
    //advanced query by name
    const name = req.query.name;
 
    var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};
    product.find(condition)
        .then(data => { res.send(data); })
        .catch(err => { res.status(500).send({ message: err.message }); });
});

// Retrieve Products based on stock
router.get("/instock", (req, res) => {
    product.find({ inStock: true })
        .then(data => { res.send(data); })
        .catch(err => { res.status(500).send({ message: err }); })
});

router.get("/:id", (req, res) => {
    product.findById(req.params.id)
        .then(data => { res.send(data); })
        .catch(err => { res.status(500).send({ message: err.message }); });
});

// Update Product
router.put("/:id", verifyToken, (req, res) => {
//router.put("/:id", (req, res) => {
    const id = req.params.id;

    product.findByIdAndUpdate(id, req.body)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Cannot update product with id=" + id + ". Maybe product was not found!" });
            else
                res.send({ message: "Product was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({ message: "Error updating Product with id=" + id });
        });

});

// Delete Product
//router.delete("/:id", (req, res) => {
router.delete("/:id", verifyToken, (req, res) => {
    const id = req.params.id;

    product.findByIdAndRemove(id,{useFindAndModify: false})
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Product with id=${id}. Maybe Product was not found!`
                });
            }
            else { res.send({ message: "Product was deleted successfully!" }); }
        })
        .catch(err => {
            res.status(500).send({ message: "Could not delete Product with id=" + id });
        });
});

module.exports = router;

