process.env.NODE_ENV = 'test';

const Product = require('../models/product');
const User = require('../models/user');


before((done) => {
    Product.deleteMany({}, function(err) {});
    User.deleteMany({}, function(err) {});
    done();
});

after((done) => {
    User.deleteMany({}, function(err) {});
    Product.deleteMany({}, function(err) {});
    done();
});

