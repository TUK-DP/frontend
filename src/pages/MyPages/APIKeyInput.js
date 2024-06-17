import { useRecoilState } from "recoil";
import { apiKeyStore } from "../../recoil/apiKeyStore";

export const API_KEY_INPUT_PAGE_PATH = "/mypage/apikey";

export const APIKeyInput = () => {
  return (
    <div className={"flex flex-col justify-center items-center h-full"}>
      <div className={"flex flex-col gap-5"}>
        <h1 className={"text-3xl font-semibold"}>API KEY 입력하기</h1>
        <p className={"text-lg text-gray-500"}>
          API KEY를 입력하면, OpenAI 의 이미지 생성 API를 사용할 수 있습니다.
        </p>
        <APIKeyInputForm />
      </div>
    </div>
  );
};

const APIKeyInputForm = () => {
  const [apiKeyState, setApiKeyState] = useRecoilState(apiKeyStore);

  const handleInput = (e) => {
    setApiKeyState((preState) => {
      return {
        ...preState,
        apiKey: e.target.value,
      };
    });
  };

  return (
    <div className={"flex flex-col gap-2.5"}>
      <div className={"flex flex-col gap-1.5"}>
        <label htmlFor="apikey" className={"text-lg"}>
          API KEY
        </label>
        <input
          type="text"
          id="apikey"
          className={"border-2 rounded-lg p-1"}
          placeholder="API KEY를 입력해주세요."
          value={apiKeyState.apiKey}
          onChange={handleInput}
        />
      </div>
    </div>
  );
};
