module.exports = (req, res, next) => {
    if (req.user.credits < 1) {
        return res.status(403).send({ error: 'Not enough credits!' });
    }
    //otherwise, let the user continue on to the actual request handler.
    next();
};