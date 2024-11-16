import React from 'react';
import './popupDicas.css';

const PopupDicas = ({ show, handleClose, handleViewProducts, children }) => {
  const showHideClassName = show ? "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" : "hidden";

  return (
    <div className={showHideClassName}>
      <section className="bg-white p-6 rounded-lg shadow-lg">
        {children}
        <div className="mt-4 flex justify-center">
          <button
            type="button"
            onClick={handleClose}
            className="mr-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Fechar
          </button>
          <button
            type="button"
            onClick={handleViewProducts}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Ver Produtos
          </button>
        </div>
      </section>
    </div>
  );
};

export default PopupDicas;
