module.exports = (req, res, next) => {
    if (!req.user) {
        return res.status(401).send({ error: 'You must log in!' });
    }
    
    //otherwise, let the user continue on to the actual request handler.
    next();
};