import {Api} from "./common.controller";

class Survey extends Api {
    findAllSimpleSurvey = async () => {
        return await this.get(`/simple`);
    }
}

export default new Survey();