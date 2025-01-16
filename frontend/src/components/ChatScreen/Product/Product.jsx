import PropTypes from "prop-types"
import React, { useState } from "react"

// import sampleUser from "../../../assets/ChatScreen/sampleUser.svg";
import minusButton from "../../../assets/ChatScreen/minusButton.svg"
import plusButton from "../../../assets/ChatScreen/plusButton.svg"
import "./Product.scss"

export const Product = ({ className, product }) => {
  const [quantity, setQuantity] = useState(0)

  const onChangeQuantity = (value) => {
    if (quantity + value >= 0) {
      setQuantity(quantity + value)
    }
  }

  const onAddToCart = () => {
    setQuantity(0)
  }

  return (
    <div className={`chat product-chat ${className}`}>
      <div className="content-wrapper">
        <p className="content">
          <img src={product?.image_url} alt="product" className="product-image" />

          <p className="product-name">{product?.name}</p>
          <div className="product-price-wrapper">
            <div className="product-price">
              {product?.original_price && <p className="original-price">{product.original_price}</p>}
              <p className="final-price">{product?.price}</p>
            </div>

            <div className="quantity-controller">
              <img src={minusButton} onClick={() => onChangeQuantity(-1)} alt="minus" />
              <div className="quantity d-flex align-items-center">{quantity}</div>
              <img src={plusButton} onClick={() => onChangeQuantity(1)} alt="plus" />
            </div>
          </div>
          {/* <div className="product-people">
            <div className="avatars">
              <img src={sampleUser} alt="sample" />
              <img src={sampleUser} alt="sample" />
              <img src={sampleUser} alt="sample" />
              <img src={sampleUser} alt="sample" />
              <img src={sampleUser} alt="sample" />
              <img src={sampleUser} alt="sample" />
            </div>

            <p>{product?.count}+</p>
          </div>
          <p>people have bought this</p> */}

          <div className="product-add" onClick={onAddToCart}>
            + Add to Cart
          </div>
        </p>
      </div>
    </div>
  )
}

Product.propTypes = {
  text: PropTypes.string,
}
