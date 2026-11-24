import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addItem,
  removeItem,
  clearCart,
  applyPromoCode,
} from "../redux/cartSlice";

export default function Cart() {
  const { items, totalCount, totalPrice, discountPercent } = useSelector(
    (state) => state.cart,
  );
  const dispatch = useDispatch();
  const [code, setCode] = useState("");

  const finalPrice = totalPrice - (totalPrice * discountPercent) / 100;

  return (
    <div className="cart-card">
      <div className="cart-header">
        <h3>My Redux Cart</h3>
        {items.length > 0 && (
          <button onClick={() => dispatch(clearCart())}>Clear</button>
        )}
      </div>
      {items.length === 0 ? (
        <p>Your cart is currently empty.</p>
      ) : (
        <>
          {items.map((item) => (
            <div key={item.id} className="cart-row">
              <span>
                {item.name} ({item.price} DT x {item.quantity})
              </span>
              <div>
                <button onClick={() => dispatch(removeItem(item.id))}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => dispatch(addItem(item))}>+</button>
              </div>
            </div>
          ))}
          <p>
            Total Items: <strong>{totalCount}</strong>
          </p>
          <p>
            Grand Total: <strong>{totalPrice} DT</strong>
          </p>

          <input
            type="text"
            placeholder="Promo code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <button onClick={() => dispatch(applyPromoCode(code))}>Apply</button>

          {discountPercent > 0 && (
            <p style={{ color: "green" }}>
              Price after {discountPercent}% discount:{" "}
              <strong>{finalPrice} DT</strong>
            </p>
          )}
        </>
      )}
    </div>
  );
}
