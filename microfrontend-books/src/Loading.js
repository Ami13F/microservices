import React from "react";

export default class Loading extends React.Component {
    render() {
        return (
            <div id="loading"><div className="loader">
                <div className="outer"></div>
                <div className="middle"></div>
                <div className="inner"></div>
            </div></div>
        );
    }
}
