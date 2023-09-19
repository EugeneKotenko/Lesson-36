import React, { useState, useEffect } from "react";
import Modal, { Styles } from "react-modal";
import { useDispatch } from "react-redux";
import { addItem, editItem, Item } from "../store/shoppingListSlice";

interface AddItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingItem?: Item;
  onAdd: (caption: string, amount: string) => void;
}

const modalStyle: Styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },
  content: {
    position: "absolute",
    alignContent: "space-evenly",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: "5px",
    boxShadow: "0 2px 6px rgba(211, 211, 255, 1)",
    margin: "-194px 0 0 -244px",
    padding: "30px",
    width: "428px",
    height: "328px",
    left: "50%",
    top: "50%",
    display: "grid",
  },
};

const inputStyle: React.CSSProperties = {
  padding: "8px",
  borderRadius: "5px",
  marginBottom: "10px",
};

const btnStyle: React.CSSProperties = {
  border: "1px solid black",
  backgroundColor: "rgb(232 232 251)",
  color: "black",
  padding: "10px",
  borderRadius: "7px",
  maxWidth: "fit-content",
  cursor: "pointer",
} as React.CSSProperties;

const AddItemModal: React.FC<AddItemModalProps> = ({
  isOpen,
  onClose,
  editingItem,
}) => {
  const [caption, setCaption] = useState<string>("");
  const [amount, setAmount] = useState<string>("");

  const dispatch = useDispatch();

  useEffect(() => {
    if (editingItem) {
      setCaption(editingItem.caption);
      setAmount(editingItem.amount.toString());
    } else {
      setCaption("");
      setAmount("");
    }
  }, [editingItem]);

  const handleAddClick = () => {
    if (!caption.trim()) {
      alert("Введіть найменування.");
    } else if (parseFloat(amount) <= 0 || isNaN(parseFloat(amount))) {
      alert("Кількість має бути більше за 0.");
    } else {
      if (editingItem) {
        dispatch(
          editItem({ id: editingItem.id, caption, amount: parseFloat(amount) })
        );
      } else {
        const newItem: Item = {
          id: Date.now(),
          caption,
          amount: parseFloat(amount),
        };
        dispatch(addItem(newItem));
      }
      setCaption("");
      setAmount("");
      onClose();
    }
  };

  const handleCaptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputText = e.target.value;
    const filteredText = inputText.replace(/[0-9]/g, "");
    setCaption(filteredText);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={modalStyle}
      contentLabel="Add Item Modal"
    >
      <h2>{editingItem ? "Редагувати позицію" : "Додати позицію"}</h2>
      <label>Найменування:</label>
      <input
        style={inputStyle}
        type="text"
        value={caption}
        onChange={handleCaptionChange}
      />
      <label>Кількість:</label>
      <input
        style={inputStyle}
        type="text"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button style={btnStyle} onClick={handleAddClick}>
        {editingItem ? "Зберегти" : "Додати"}
      </button>
      <button style={btnStyle} onClick={onClose}>
        Відміна
      </button>
    </Modal>
  );
};

export default AddItemModal;
