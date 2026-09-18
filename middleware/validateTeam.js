const validateTeam = (req, res, next) => {
    const {
        name,
        location,
        coach,
        division,
        season,
        foundedYear
    } = req.body;

    if (
        !name ||
        !location ||
        !coach ||
        !division ||
        !season ||
        foundedYear === undefined
    ) {
        return res.status(400).json({
            error: 'All team fields are required.'
        });
    }

    if (!Number.isInteger(Number(foundedYear))) {
        return res.status(400).json({
            error: 'Founded year must be a whole number.'
        });
    }

    next();
};

module.exports = validateTeam;
