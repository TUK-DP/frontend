import { useEffect } from "react";

const useGetLocation = () => {
  const params = new URLSearchParams(window.location.search);

  useEffect(() => {
    let latitude = params.get("latitude");
    let longitude = params.get("longitude");

    if (latitude && longitude) {
      window.position = { latitude, longitude };
    }

    console.log("window.position : ", window.position);
  }, []);
};

export default useGetLocation;
