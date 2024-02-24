import {Api} from "./common.controller";

class DiaryController extends Api {
    findById = async ({diaryId=0}) => {
        return await this.get(`/diary/${diaryId}`);
    }
}

export default new DiaryController();