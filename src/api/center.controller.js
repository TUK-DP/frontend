import {Api} from "./common.controller";

class Center extends Api {
  //주변 치매 센터 조회
    searchCenter = async ({ lat, lon, radius }) => {
      return await this.get(`/center/?lat=${lat}&lon=${lon}&radius=${radius}`);
    };
}

export default new Survey();