import React from "react";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "./scss/index.scss"

import Loader from "react-loader-spinner";
export default class DefaultLoader extends React.Component {
  render() {
    return (
      <div className="loader-class">
        <Loader
          type="TailSpin"
          color="#431933"
          height={50}
          width={50}
        />
      </div>
    );
  }
}

