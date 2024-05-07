import { Api } from "./common.controller";

class KeywordController extends Api {
  //일기별 키워드 조회
  getKeyword = async (diaryId) => {
    return await this.get(`/keyword/diary/${diaryId}`);
  };
  //키워드별 이미지 저장
  saveKeywordImg = async (keywordId, imgData) => {
    return await this.post(`/keyword/${keywordId}/image`, { data: imgData });
  };
}

export default new KeywordController();
