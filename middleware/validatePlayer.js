const validatePlayer = (req, res, next) => {
    const {
        firstName,
        lastName,
        email,
        phone,
        position,
        jerseyNumber,
        height,
        team,
        status
    } = req.body;

    if (
        !firstName ||
        !lastName ||
        !email ||
        !phone ||
        !position ||
        jerseyNumber === undefined ||
        !height ||
        !team ||
        !status
    ) {
        return res.status(400).json({
            error: 'All player fields are required.'
        });
    }

    if (!email.includes('@')) {
        return res.status(400).json({
            error: 'Please provide a valid email address.'
        });
    }

    if (!Number.isInteger(jerseyNumber) || jerseyNumber < 0) {
        return res.status(400).json({
            error: 'Jersey number must be a positive whole number.'
        });
    }

    next();
};

module.exports = validatePlayer;