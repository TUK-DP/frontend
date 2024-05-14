import { Api } from "./common.controller";

class ImgController extends Api {
  // 이미지 업로드
  uploadImg = async (imgData) => {
    return await this.post("/image", {
      data: imgData,
      content_type: "multipart/form-data",
    });
  };
}

export default new ImgController();
// return axios.post("http://52.79.249.163:8001/image", formData, {});
