import {Api} from "./common.controller";

class Record extends Api {
  //치매진단 결과 저장
  saveRecord = async (recordData) => {
    return await this.post("/user/recordsave", { data: recordData });
  };
  //유저의 이전 진단 기록 조회
  prevRecord = async ({userId}) => {
    return await this.get(`/users/prevrecord?userId=${userId}`);
  };
}

export default new Record();