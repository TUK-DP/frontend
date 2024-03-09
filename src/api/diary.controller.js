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
  //일기회상 퀴즈
  getQuiz = async ({ diaryId = 2 }) => {
    return await this.get(`/diary/quiz?diaryId=${diaryId}`);
  };
}
export default new DiaryController();
