import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ordered, restocked } from "./iceCreamSlice";

export default function IceCreamView() {
  const numOfIceCream = useSelector((state) => state.iceCream.numOfIceCream);
  const dispatch = useDispatch();
  return (
    <div>
      <h2>Number of ice cream - {numOfIceCream} </h2>
      <button onClick={() => dispatch(ordered(1))}>Order ice cream</button>
      <button onClick={() => dispatch(restocked(1))}>Restock ice creams</button>
    </div>
  );
}
