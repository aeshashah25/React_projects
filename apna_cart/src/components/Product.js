import React from "react";

export default function Product(props) {
  return (
    <div className="row ">
      <div className="col-3">
        <h2>
          {props.product.name}
          <span class="badge bg-secondary  m-2 ">
            Rs {props.product.price}/-
          </span>
        </h2>
      </div>

      <div className="col-3">
        <button
          type="button"
          class="btn btn-primary"
          onClick={() => {
            props.decrement(props.index);
          }}
        >
          -
        </button>
        <button type="button" class="btn btn-secondary">
          {" "}
          {props.product.Quantity}
        </button>
        <button
          type="button"
          class="btn btn-success"
          onClick={() => {
            props.increment(props.index);
          }}
        >
          +
        </button>
      </div>
      <div className="col-3">
        {props.product.Quantity * props.product.price}
      </div>
      <div className="col-3">
        <button
          type="button"
          class="btn btn-danger btn-sm rounded mt-2"
          onClick={() => {
            props.remove(props.index);
          }}
        >
          Remove
        </button>
      </div>
    </div>
  );
}
