import { Api } from "./common.controller";

class DiaryController extends Api {
  //유저의 일기 조회
  findById = async ({ userId = 0 }) => {
    return await this.get(`/diary/list/userId=?${userId}`);
  };
  //일기 작성
  writeDiary = async (diaryData) => {
    return await this.post("/diary/write", { data: diaryData });
  };
  //일기 수정
  updateDiary = async (diaryData) => {
    return await this.post("/diary/update", { data: diaryData });
  };
  //일기회상 퀴즈
  getQuiz = async ({ diaryId = 0 }) => {
    return await this.get(`/diary/quiz?diaryId=${diaryId}`);
  };
}
export default new DiaryController();
