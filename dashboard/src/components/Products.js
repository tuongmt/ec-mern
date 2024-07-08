import React, { useEffect, useRef, useState } from "react";
import "../styles/Products.scss";
import { Link, useNavigate, useParams } from "react-router-dom";
import Utils from "../utils/Utils.js";

export const Products = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [data, setData] = useState([]);
  const [category, setCategory] = useState("");
  const [quality, setQuality] = useState("");
  const [sort, setSort] = useState("price");
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const itemsPerPage = 10;
  const searchFocus = useRef();

  const getProducts = async () => {
    try {
      setLoadingProducts(true);
      const response = await fetch(
        process.env.REACT_APP_LOCALHOST_PRODUCT_API_URL +
          `/products?category=${category}&quality=${quality}&sort=${sort}`
      );
      const responseData = await response.json();
      const data = responseData.products;
      const numberOfPages = Math.ceil(data.length / itemsPerPage);
      const newData = Array.from(
        {
          length: numberOfPages,
        },
        (_, index) => {
          const start = index * itemsPerPage;
          return data.slice(start, start + itemsPerPage);
        }
      );
      setData(newData);
      setProducts(newData[page]);
    } catch (error) {
      console.log(error);
      setLoadingProducts(true);
    }
  };

  useEffect(() => {
    getProducts();
  }, [category, quality, sort, page]);

  const navigateToCreateNewProduct = () => {
    navigate("/create-new-product");
  };

  const navigateToUpdateProduct = (id) => {
    console.log(id);
    navigate(`/update-product/${id}`);
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      const requestOptions = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
        }),
      };
      fetch(
        `${process.env.REACT_APP_LOCALHOST_PRODUCT_API_URL}/products/${id}`,
        requestOptions
      )
        .then((res) => {
          Utils.successToast("Product deleted successfully");
          getProducts();
        })
        .catch((error) => {
          Utils.errorToast("Error from server");
        });
    }
  };

  const prevPage = () => {
    setPage((oldPage) => {
      if (oldPage === 0) {
        return data.length - 1;
      }
      return oldPage - 1;
    });
  };

  const handlePage = (index) => {
    setPage(index);
  };

  const nextPage = () => {
    setPage((oldPage) => {
      if (oldPage === data.length - 1) {
        return 0;
      }
      return oldPage + 1;
    });
  };

  return (
    <div className="products">
      <div className="products-container">
        <div className="products-title-search-create">
          <h2>Products</h2>
          <div className="search-container">
            <input
              type="text"
              className="search-input"
              placeholder="Search..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              ref={searchFocus}
            />
            <button className="search-icon-btn">
              <i class="fa-solid fa-magnifying-glass"></i>
            </button>
          </div>
          <div className="create-new-container">
            <button
              className="create-new-btn"
              onClick={() => navigateToCreateNewProduct()}
            >
              <i class="fa-solid fa-plus" />
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="product-info-container">
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Total Amount</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((item) => {
                const { images, name, totalAmount, price, category } = item;
                return (
                  <tr key={item._id}>
                    <td className="product-info">
                      <img
                        src={images[0]}
                        alt="product-img"
                        className="product-img"
                      />
                      <p>{name}</p>
                    </td>
                    <td>{category}</td>
                    <td>{totalAmount}</td>
                    <td>${price}</td>
                    <td className="action">
                      <button
                        onClick={() => navigateToUpdateProduct(item._id)}
                        className="edit-btn"
                      >
                        <i class="fa-solid fa-pen" />
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(item._id)}
                        className="delete-btn"
                      >
                        <i class="fa-solid fa-trash" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      {data.length > 1 && (
        <div className="pagination-container">
          <button className="prev-btn" onClick={prevPage}>
            Prev
          </button>
          {data.map((_, index) => {
            return (
              <button
                key={index}
                className={`${index === page && "active-btn"}`}
                onClick={() => handlePage(index)}
              >
                {index + 1}
              </button>
            );
          })}
          <button className="next-btn" onClick={nextPage}>
            Next
          </button>
        </div>
      )}
    </div>
  );
};
