import DiaryController from './api/diary.controller.js';

let ret = await DiaryController.findById({questionId: "1"});
console.log(ret.data);
console.log(process.env.REACT_APP_GAME_URL);