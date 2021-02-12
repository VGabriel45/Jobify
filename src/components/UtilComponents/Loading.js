import React from "react";
import Lottie from "react-lottie";
import * as loading from "../../loading.json";

const Loading = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loading.default,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div style={{ marginTop: "10rem" }}>
      <Lottie options={defaultOptions} height={120} width={120} />
    </div>
  );
};

export default Loading;
