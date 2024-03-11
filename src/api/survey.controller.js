import {SurveyApi} from "./test.controller";

class Survey extends SurveyApi {
    findAllSimpleSurvey = async () => {
        return await this.get(`/simple`);
    }
}

export default new Survey();