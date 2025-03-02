import React from "react";
import Product from "./Product";

export default function Product_list(props) {
  return props.products.length > 0 ? (
    props.products.map((product, i) => {
      return (
        <Product
          product={product}
          key={i}
          increment={props.increment}
          index={i}
          decrement={props.decrement}
          remove={props.remove}
          
        />
      );
    })
  ) : (
    <h1>No products in the Cart</h1>
  );
}
