import { Api } from "./common.controller";

class KeywordController extends Api {
  //일기별 키워드 조회
  getKeyword = async (diaryId) => {
    return await this.get(`/keyword/diary/${diaryId}`);
  };
}

export default new KeywordController();
