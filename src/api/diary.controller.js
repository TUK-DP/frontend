import { Api } from "./common.controller";

class DiaryController extends Api {
  //유저의 일기 조회
  searchDiary = async ({ userId, date }) => {
    return await this.get(`/diary/user/${userId}?date=${date}`);
  };
  //일기 작성
  writeDiary = async (diaryData) => {
    return await this.post("/diary", { data: diaryData });
  };
  //일기 수정
  updateDiary = async (diaryId, diaryData) => {
    return await this.patch(`/diary/${diaryId}`, { data: diaryData });
  };
  // 일기 삭제
  deleteDiary = async (diaryId, diaryData) => {
    return await this.delete(`/diary/${diaryId}`);
  };
  //일기회상 퀴즈
  getQuiz = async ({ diaryId }) => {
    return await this.get(`/quiz?diaryId=${diaryId}`);
  };
  //일기회상 답안 확인
  checkAnswer = async (quizData) => {
    return await this.post("/diary/checkanswer", { data: quizData });
  };

  //키워드별 사진 페이징
  getKeywordPhotos = async ({ keyword, page, pageSize }) => {
    return await this.get(
      `/image?keyword=${keyword}&page=${page}&pageSize=${pageSize}`
    );
  };
  //키워드별 이미지 저장
  saveKeywordImg = async (keywordId, imgUrl) => {
    return await this.post(`/keyword/${keywordId}/image`, {
      data: imgUrl,
    });
  };

  //일기 이미지 저장
  saveDiaryImg = async (diaryId, imgUrl) => {
    return await this.post(`/diary/${diaryId}/image`, {
      data: imgUrl,
    });
  };
}
export default new DiaryController();
