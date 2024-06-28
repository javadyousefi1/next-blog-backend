const Controller = require('../../common/controller');
const jwt = require("jsonwebtoken");

class JwtController extends Controller {
    constructor() {
        super();
    }

    async generateNewToken(payload, next) {
        try {
            return await jwt.sign({ payload }, process.env.JWT_SECRET, { expiresIn: 60 * 60 });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = { JwtController: new JwtController() };
