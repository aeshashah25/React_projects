import React, { useState } from "react";
import Navbar from "./components/Nav_bar";
import Product_list from "./components/Product_list";
import "./App.css";
import Footer from "./components/Footer";
import Add_item from "./components/Add_item";

function App() {
  const initialProducts = [
    {
      price: 999,
      name: "Iphone10s max",
      Quantity: 0,
    },
    {
      price: 999,
      name: "Oppo 10s max",
      Quantity: 0,
    },
    {
      price: 999,
      name: "Redmi 10s max",
      Quantity: 0,
    },
  ];

  // usestate declaration
  const [products, setProducts] = useState(initialProducts);
  const [totalamount, settotalamount] = useState(0);

  // function declartion
  const increment = (index) => {
    let newProducts = [...products];
    let newtotalamount = totalamount;
    newProducts[index].Quantity++;
    newtotalamount += newProducts[index].price;
    setProducts(newProducts);
    settotalamount(newtotalamount);
  };

  const decrement = (index) => {
    let newProducts = [...products];
    let newtotalamount = totalamount;

    if (newProducts[index].Quantity > 0) {
      newProducts[index].Quantity--;
      newtotalamount -= newProducts[index].price;
    }
    setProducts(newProducts);
    settotalamount(newtotalamount);
  };

  const reset = () => {
    let newProducts = [...products];
    newProducts.forEach((e) => {
      e.Quantity = 0;
    });
    setProducts(newProducts);
    settotalamount(0);
  };

  const remove = (index) => {
    let newProducts = [...products];
    let newtotalamount = totalamount;
    newtotalamount -= newProducts[index].Quantity * newProducts[index].price;
    newProducts.splice(index, 1);
    setProducts(newProducts);
    settotalamount(newtotalamount);
  };

  const additem = (name,price) => {
    let newProducts = [...products];
          newProducts.push({
           price:price,
           name:name,
           Quantity:0
          });
          setProducts(newProducts);

  }

  return (
    <>
      <Navbar />

      <main className="container mt-5 w-100 border">
      <Add_item additem={additem}/>
        <Product_list
          products={products}
          increment={increment}
          decrement={decrement}
          remove={remove}
        />
      </main>
      <Footer totalamount={totalamount} reset={reset} />
    </>
  );
}

export default App;
