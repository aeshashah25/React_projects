import React from "react";

export default function Footer(props) {
  return (
    <div className="row fixed-bottom">
      <button className="btn btn-danger col-5" onClick={() => props.reset()}>
        Reset
      </button>
      <div className="col-2 bg-black text-white text-center pt-2">
        {props.totalamount}
      </div>
      <div className="btn btn-primary col-5">Pay Now</div>
    </div>
  );
}
