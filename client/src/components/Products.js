import React, { useEffect, useState } from "react";
import "../styles/Products.scss";
import "../styles/Pagination.scss";
import { Link } from "react-router-dom";
import Product from "./Product";
import { Loading } from "./Loading";

export const Products = () => {
  const [data, setData] = useState();
  const [category, setCategory] = useState("");
  const [quality, setQuality] = useState("");
  const [sort, setSort] = useState("price");
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [products, setProducts] = useState();
  const [page, setPage] = useState(0);
  const itemsPerPage = 9;

  const getProducts = async () => {
    try {
      setLoadingProducts(true);
      const response = await fetch(
        `${process.env.REACT_APP_LOCALHOST_PRODUCT_API_URL}/products?category=${category}&quality=${quality}&sort=${sort}`
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
    } catch (error) {
      console.log(error);
      setLoadingProducts(true);
    }
  };

  useEffect(() => {
    setPage(0);
    getProducts();
  }, [category, quality, sort]);

  useEffect(() => {
    if (!data) return;
    window.scrollTo({ top: 0, left: 0, behavior: "smooth", duration: 5000 });
    setLoadingProducts(false);
    setProducts(data[page]);
  }, [data, page]);

  const clearFilter = () => {
    setCategory("");
    setQuality("");
    setSort("");
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
        <div className="products-filter">
          <div className="products-title">
            <Link to="/" className="link-back-home">
              HOME
            </Link>
            <span className="slash">/</span>
            <span className="products-page">PRODUCTS</span>
          </div>
          <div className="categories-container">
            <h3>Categories</h3>
            <ul>
              <li
                className={`${category === "" && "category-active"}`}
                onClick={() => setCategory("")}
              >
                All
              </li>
              <li
                className={`${category === "foods" && "category-active"}`}
                onClick={() => setCategory("foods")}
              >
                Foods
              </li>
              <li
                className={`${category === "beverages" && "category-active"}`}
                onClick={() => setCategory("beverages")}
              >
                Beverages
              </li>
              <li
                className={`${
                  category === "confectionery" && "category-active"
                }`}
                onClick={() => setCategory("confectionery")}
              >
                Confectionery
              </li>
            </ul>
          </div>
          <div className="qualities-container">
            <h3>Qualities</h3>
            <ul>
              <li
                className={`${quality === "" && "quality-active"}`}
                onClick={() => setQuality("")}
              >
                All
              </li>
              <li
                className={`${quality === "best seller" && "quality-active"}`}
                onClick={() => setQuality("best seller")}
              >
                Best seller
              </li>
              <li
                className={`${quality === "most popular" && "quality-active"}`}
                onClick={() => setQuality("most popular")}
              >
                Most popular
              </li>
            </ul>
          </div>
          <div className="sort-container">
            <label htmlFor="sort">Sort by:</label>
            <select
              name="sort"
              id="sort"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="price">Price (Lowest)</option>
              <option value="-price">Price (Highest)</option>
              <option value="name">Name (A-Z)</option>
              <option value="-name">Name (Z-A)</option>
            </select>
          </div>
          <button className="clear-filter-btn" onClick={clearFilter}>
            Clear filter
          </button>
        </div>
        <div className="products-list">
          {loadingProducts ? (
            <Loading />
          ) : !products ? (
            <p className="product-empty">No products matched your search.</p>
          ) : (
            products.map((product) => {
              return <Product product={product} key={product._id} />;
            })
          )}
        </div>
      </div>
      {products && (
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
