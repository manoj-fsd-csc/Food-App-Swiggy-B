import React, { useState, useEffect, useContext } from "react";
import { API_URL } from "../api";
import { useParams } from "react-router-dom";
 import { RiSubtractFill } from "react-icons/ri";
import { ProductContext } from "../../context/ProductContext";
import star from "../../assets/images/star.png";
import veg from "../../assets/images/veg.png";
import nonveg from "../../assets/images/non-veg.png";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";
import { Oval } from 'react-loader-spinner';
import ProductMenuTopBar from "./ProductMenuTopBar";

const ProductMenu = () => {
  const [products, setProducts] = useState([]);
  const [firmArea, setFirmArea] = useState([]);
  const [firmImage, setFirmImage] = useState([]);
  const [topProductData, setTopProductData] = useState([]);
  const { firmId, firmName } = useParams();
  const { clickedProducts, addClickedProduct, removeClickedProduct } = useContext(ProductContext);
  const [loading, setLoading] = useState(true);


     
  const handleScroller = (direction) => {
    const gallery = document.getElementById("chainGallery");
    const scrollAmount = 500;

    if (direction === "left") {
      gallery.scrollTo({
        left: gallery.scrollLeft - scrollAmount,
        behavior: "smooth"
      });
    } else if (direction === "right") {
      gallery.scrollTo({
        left: gallery.scrollLeft + scrollAmount,
        behavior: "smooth"
      });
    }
  };

  const productHandler = async () => {
    try {
      const response = await fetch(`${API_URL}/product/${firmId}/products`);
      const newProductData = await response.json();
      setTopProductData(newProductData);
      setProducts(newProductData.products);
      setFirmArea(newProductData.restaurentArea);
      setFirmImage(newProductData.restaurentImage);
      setLoading(false);
    } catch (error) {
      console.error("Product failed to fetch:", error);
      setLoading(true);
    }
  };

  useEffect(() => {
    productHandler();
  }, [firmId]);

  const handleIncrease = (item) => {
    addClickedProduct(item);
  };

  const handleDecrease = (item) => {
    removeClickedProduct(item._id);
  };



  return (
    <>
      <ProductMenuTopBar/>
      <section className="productSection">
        <div className="mainFirmName">
          <h2><strong>{firmName}</strong></h2>
          {firmArea}
        </div>

        <div className="loaderSection">
          {loading && (
            <>
              <div className='loader'>Loading...</div>
              <Oval
                visible={true}
                height="80"
                width="80"
                color="#4fa94d"
                ariaLabel="oval-loading"
              />
            </>
          )}
        </div>
 
        <div className="topProductSectionTop">
          <div className='topProductSectionTopTitle'>
            <h2>Top Picks From This Restaurant</h2>
          </div>
          <div className="topProductSectionBtnSection">
            <button onClick={() => handleScroller("left")}>
              <HiOutlineChevronLeft className='topProductSectionBtnSectionLeft' />
            </button>
            <button onClick={() => handleScroller("right")}>
              <HiOutlineChevronRight className='topProductSectionBtnSectionRight' />
            </button>
          </div>
        </div>

        <section className='topProductSection' id="chainGallery">
          {topProductData.products && topProductData.products.map((product) => (

            <div className="topProductBox" key={product._id}>
              <div className="firmImage">
                <img className='topProductImg' src={`${API_URL}/uploads/${product.image}`} alt={product.productName} />
                <div className="topProductOffer">₹{product.price}</div>
              </div>
              <div className="topProductDetails">
              <div className="topProductDetailsFL">
                <div className="topProductProductNameBox">
                 {product.category.includes('veg') ? (
                   <img className='topProductCartProductvegimg' src={veg} alt="Veg" />
                  ) : (
                    <img className='topProductCartProductvegimg' src={nonveg} alt="Non-Veg" />
                  )}
                  <div className="topProductProductProductName">{product.productName}</div>
              </div>
                  </div>
                  <div className="reviewStar">
                  <img className='cartProductvegimg' src={star} alt="Non-Veg"  />
                  <div className="reviewStarCount">4.1 <span>(27)</span></div>
                  </div>
                 {/* <div className="firmArea">{product.region.join(',')}</div> */}
                <div className="topProductDescription">{product.description}</div>
            </div>
            </div>
          ))}
        </section>
        <div className="seprate"></div>
        <section className="productListSection">
          {products.map((item) => {
            const quantity = clickedProducts[item._id]?.quantity || 0;
            return (
              <div className="productBox" key={item._id}>
                <div className="productDetails">
                  {item.category.includes('veg') ? (
                    <img className='cartProductvegimg' src={veg} alt="Veg" />
                  ) : (
                    <img className='cartProductvegimg' src={nonveg} alt="Non-Veg" />
                  )}
                  <div className="itemProductName">{item.productName}</div>
                  <div className="itemPrice">₹{item.price}</div>
                  <div className="reviewStar">
                  <img className='cartProductvegimg' src={star} alt="Non-Veg"  />
                  <div className="reviewStarCount">4.1 <span>(27)</span></div>
                  </div>
                  <div className="itemDescription">{item.description}</div>
                </div>
                <div className="productGroup">
                  <img src={`${API_URL}/uploads/${item.image}`} alt={item.productName} />
                  <div className='productAddButtonBox'>
                    <div className='productAddButtonsub'>
                      <button onClick={() => handleDecrease(item)} disabled={quantity === 0}>
                        <RiSubtractFill />
                      </button>
                    </div>
                    <div className='productAddButtoncount'>{quantity}</div>
                    <div className='productAddButtonadd'>
                      <button onClick={() => handleIncrease(item)}>+</button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </section>
      </section>
    </>
  );
};

export default ProductMenu;