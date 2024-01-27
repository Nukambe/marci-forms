import { createContext, useRef, useState, useEffect, useContext } from "react";
import ReactDOM from "react-dom";
import "./Modal.css";

export const ModalContext = createContext();

export const ModalProvider = (props) => {
  const modalRef = useRef();
  const [value, setValue] = useState(null);

  useEffect(() => {
    setValue(modalRef.current);
  }, [modalRef]);

  return (
    <>
      <ModalContext.Provider value={value}>
        {props.children}
      </ModalContext.Provider>
      <div ref={modalRef} />
    </>
  );
};

export function Modal({ children }) {
  const modalNode = useContext(ModalContext);
  if (!modalNode) return null;

  return ReactDOM.createPortal(
    <div id="modal">
      <div id="modal-bg" />
      <div id="modal-content">{children}</div>
    </div>,
    modalNode
  );
}
