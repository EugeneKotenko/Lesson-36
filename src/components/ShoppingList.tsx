import React, { useState } from "react";
import ShoppingItem from "./ShoppingItem";
import AddItemModal from "./AddItemModal";
import { useDispatch, useSelector } from "react-redux";
import {
  addItem,
  editItem,
  deleteItem,
  Item,
  RootState,
} from "../store/shoppingListSlice";

const btnStyle: React.CSSProperties = {
  border: "1px solid black",
  backgroundColor: "rgb(232 232 251)",
  color: "black",
  padding: "10px",
  borderRadius: "7px",
  maxWidth: "fit-content",
  cursor: "pointer",
};

const ShoppingList: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingItem, setEditingItem] = useState<Item | undefined>(undefined);

  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.shoppingList.items);

  const handleAddItem = (caption: string, amount: string) => {
    if (editingItem) {
      dispatch(
        editItem({ id: editingItem.id, caption, amount: parseFloat(amount) })
      );
      setEditingItem(undefined);
    } else {
      dispatch(
        addItem({ id: Date.now(), caption, amount: parseFloat(amount) })
      );
    }
    setIsModalOpen(false);
  };

  const handleEditClick = (item: Item) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const newItem: Item = {
    id: Date.now(),
    caption: "Example Item",
    amount: 5,
  };

  const handleDeleteClick = (item: Item) => {
    dispatch(deleteItem({ id: item.id }));
  };

  return (
    <div>
      <h1>Список покупок</h1>
      <button style={btnStyle} onClick={() => setIsModalOpen(true)}>
        Додати позицію
      </button>
      {items.map((item) => (
        <ShoppingItem
          key={item.id}
          item={item}
          onEditClick={() => handleEditClick(item)}
          onDeleteClick={() => handleDeleteClick(item)}
        />
      ))}
      <AddItemModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingItem(undefined);
        }}
        editingItem={editingItem}
        onAdd={handleAddItem}
      />
    </div>
  );
};

export default ShoppingList;
