import React from "react";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import * as S from "./styles";

import Loader from "react-loader-spinner";
export class DefaultLoader extends React.Component {
  render() {
    return (
      <S.Wrapper>
        <Loader
          type="TailSpin"
          color="#431933"
          height={50}
          width={50}
          
        />
      </S.Wrapper>
    );
  }
}
