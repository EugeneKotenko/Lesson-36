import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import ShoppingList from "./components/ShoppingList";
import store from "./store/shoppingListSlice";

import Modal from "react-modal";

Modal.setAppElement("#root");

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <ShoppingList />
  </Provider>
);
