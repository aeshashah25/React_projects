import React from "react";

class Add_item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productname: "",
      productprice: "",
    };
  }
  render() {
    return (
      <form
        className="form-inline"
        onSubmit={(e) => {
            e.preventDefault();
            const { productname, productprice } = this.state;
            
            if (!productname || !productprice) {
              alert(  "Please fill in both fields" );
              return;
            }
        
            this.props.additem(productname, Number(productprice));
            this.setState({ productname: "", productprice: "", error: "" });
          }}
      >
        <div className="form-group ">
          <input
            type="text"
            readOnly=""
            className="form-control  col-6 mt-1"
            id="inputproduct"
            placeholder="enter the product name"
            name="productname"
            onChange={(e) => {
              this.setState({ productname: e.currentTarget.value });
            }}
            value={this.state.productname}
          />
        </div>
        <div className="form-group ">
          <input
            type="number"
            className="form-control col-3 mt-1"
            id="inputprice"
            placeholder="enter the product price"
            name="productprice"
            onChange={(e) => {
              this.setState({ productprice: Number(e.currentTarget.value) });
            }}
            value={this.state.productprice}
          />
        </div>

        <div className="form-group ">
          <button
            type="submit"
            className="btn btn-primary mx-auto mb-2 d-flex justify-content-center rounded mt-1 col-3"
          >
            Add
          </button>
        </div>
      </form>
    );
  }
}

export default Add_item;
