import { Api } from "./common.controller";

class DiaryController extends Api {
  //유저의 일기 조회
  searchDiary = async ({ userId, date }) => {
    return await this.get(`/diary/search?userId=${userId}&date=${date}`);
  };
  //일기 작성
  writeDiary = async (diaryData) => {
    return await this.post("/diary/write", { data: diaryData });
  };
  //일기 수정
  updateDiary = async (diaryData) => {
    return await this.patch("/diary/update", { data: diaryData });
  };
  // 일기 삭제
  deleteDiary = async (diaryData) => {
    return await this.delete("/diary/delete", { data: diaryData });
  };
  //일기회상 퀴즈
  getQuiz = async ({ diaryId }) => {
    return await this.get(`/diary/quiz?diaryId=${diaryId}`);
  };
  //일기회상 답안 확인
  checkAnswer = async (quizData) => {
    return await this.post("/diary/checkanswer", { data: quizData });
  };
  //일기별 키워드 조회
  getKeyword = async (diaryId) => {
    return await this.get(`/diary/keyword?diaryId=${diaryId}`);
  };
  //키워드별 사진 페이징
  getKeywordPhotos = async ({ keyword, page, pageSize }) => {
    return await this.get(
      `/diary/pagingImg?keyword=${keyword}&page=${page}&pageSize=${pageSize}`
    );
  };
}
export default new DiaryController();
