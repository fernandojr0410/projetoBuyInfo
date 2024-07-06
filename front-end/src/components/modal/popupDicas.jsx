import React from 'react';
import './popupDicas.css';

const PopupDicas = ({ show, handleClose, handleViewProducts, children }) => {
  const showHideClassName = show ? "popup display-block" : "popup display-none";
  return (
    <div className={showHideClassName}>
      <section className="popup-main">
        {children}
        <button type="button" onClick={handleClose}>
          Fechar
        </button>

        <button type="button" onClick={handleViewProducts}>
          Ver Produtos
        </button>
      </section>
    </div>
  );
};
export default PopupDicas;

