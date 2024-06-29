// controller
const Controller = require('../../common/controllers/controller');
// jwt
const jwt = require("jsonwebtoken");

class JwtController extends Controller {
    constructor() {
        super();
    }

    async generateNewToken(payload, next) {
        try {
            return await jwt.sign({ email:payload }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 1000 });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = { JwtController: new JwtController() };
