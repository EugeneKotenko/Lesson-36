import React from "react";
import "./shopping.scss";
import { useDispatch } from "react-redux";
import { deleteItem } from "../store/shoppingListSlice";

interface ShoppingItemProps {
  item: { id: number; caption: string; amount: number };
  onEditClick: () => void;
  onDeleteClick: () => void;
}

const btnStyle: React.CSSProperties = {
  border: "none",
  backgroundColor: "transparent",
  cursor: "pointer",
  marginLeft: "10px",
};

const itemStyle: React.CSSProperties = {
  marginTop: "40px",
};

const ShoppingItem: React.FC<ShoppingItemProps> = ({ item, onEditClick }) => {
  const dispatch = useDispatch();

  const handleDeleteClick = () => {
    dispatch(deleteItem({ id: item.id }));
  };

  return (
    <div style={itemStyle}>
      <span>
        {item.caption} - {item.amount}
      </span>
      <button style={btnStyle} onClick={onEditClick}>
        ✏️
      </button>
      <button style={btnStyle} onClick={handleDeleteClick}>
        🗑️
      </button>
    </div>
  );
};

export default ShoppingItem;
