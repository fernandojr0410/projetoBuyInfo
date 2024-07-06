import React from 'react';
import Logo from "../../assets/images/logo-buy-info.png";
import { Link, useLocation } from "react-router-dom";
import UserProfile from "./components/userProfile";
import ItemsCart from "./components/itemsCart";
import { BiUserCircle } from "react-icons/bi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { useState } from "react";
import PopupDicas from "../../components/modal/popupDicas";

function Header({ cliente, handleUser, itemsCart }) {
  const location = useLocation();
  const hideCartIcon =
    location.pathname === "/login-cliente" ||
    location.pathname === "/cadastro-cliente";
  const hideLoginIcon =
    location.pathname === "/login-cliente" ||
    location.pathname === "/cadastro-cliente";
  const [mostrarDicas, setMostrarDicas] = useState(false)
  const handleMostrarDicas = () => {
    setMostrarDicas(!mostrarDicas)
    console.log("mostrarDicas", mostrarDicas)
  }
  const [buscaRapida, setBuscaRapida] = useState([])
  const [grupos, setGrupos] = useState("gamer")
  const [termoDeBusca, setTermoDeBusca] = useState('');

  const handlefastSearch = () => {
    const encodedSearchTerm = encodeURIComponent(termoDeBusca);
    console.log(grupos)
    fetch(`http://localhost:5000/product/findByProductGroup?grupos=${grupos}&nome=${encodedSearchTerm}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erro ao buscar produtos');
        }
        return response.json();
      })
      .then((data) => {
        setBuscaRapida(data)
        console.log("data", data)
      })
      .catch((error) => console.error('Erro ao buscar produtos:', error));
  };
  return (
    <header className="flex items-center justify-between bg-white w-screen h-24 p-8">
      <Link to="/home">
        <img src={Logo} alt="Logo Buy Info" className="w-56" />
      </Link>

      <div className="flex items-center gap-4">
        {/* <button className="flex items-center gap-2" onClick={() => handleMostrarDicas}>
          <div className="flex">
            <IoIosInformationCircleOutline className="h-6 w-6" />
          </div>
          <div className="flex">
            <span className="text-lg">Dicas</span>
          </div>
        </button> */}
        <button onClick={handleMostrarDicas}>Dicas</button>
        {!hideCartIcon && (
          <Link to="/carrinho" className="relative flex items-center gap-2">
            <AiOutlineShoppingCart className="h-6 w-6" />
            <span className="text-lg">Carrinho</span>
            <ItemsCart itemsCart={itemsCart} />
          </Link>
        )}

        {!hideLoginIcon && (
          <div className="flex items-center gap-4">
            {cliente ? (
              <UserProfile cliente={cliente} handleUser={handleUser} />
            ) : (
              <Link to="/login-cliente" className="flex items-center gap-2">
                <BiUserCircle className="h-6 w-6" />
                <span className="text-lg">Entrar</span>
              </Link>
            )}
          </div>
        )}
      </div>

      <PopupDicas show={mostrarDicas} handleClose={handleMostrarDicas} handleViewProducts={() => { console.log('navegar para outra tela') }}>
        <div className='flex flex-col gap-10 items-center'>
          <div className='flex'>
            <p>Selecione o tipo de produto que você deseja buscar</p>
          </div>

          <div className='flex'>
            <div className='flex gap-5'>
              <button onClick={() => setGrupos(grupos.concat(',', 'gamer'))} className={grupos.includes('gamer') ? 'bg-green-400' : 'bg-slate-400'}>Gamer</button>
              <button onClick={() => setGrupos(grupos.concat(',', 'servidor'))} className={grupos.includes('servidor') ? 'bg-green-400' : 'bg-slate-400'}>Servidor</button>
              <button onClick={() => setGrupos(grupos.concat(',', 'trabalho'))} className={grupos.includes('trabalho') ? 'bg-green-400' : 'bg-slate-400'}>Trabalho</button>
              <button onClick={() => setGrupos(grupos.concat(',', 'estudos'))} className={grupos.includes('estudos') ? 'bg-green-400' : 'bg-slate-400'}>Estudos</button>
              <button onClick={() => setGrupos(grupos.concat(',', 'desenvolvimento'))} className={grupos.includes('desenvolvimento') ? 'bg-green-400' : 'bg-slate-400'}>Desenvolvimento</button>
              <button onClick={() => setGrupos(grupos.concat(',', 'alta performace'))} className={grupos.includes('alta performace') ? 'bg-green-400' : 'bg-slate-400'}>Alta Performance</button>
            </div>
          </div>
          <div className='flex'>
            <p>{grupos}</p>
          </div>
        </div>

        <input
          type="text"
          placeholder="Estou buscando por..."
          className="flex w-full bg-white py-1 px-4 outline-none focus:outline-none"
          value={termoDeBusca}
          onChange={(e) => {
            setTermoDeBusca(e.target.value)
            if (e.target.value.length >= 3) {
              handlefastSearch()
            }
            if (e.target.value.length < 3) setBuscaRapida([])
          }}
        />
        <p>Resultados {buscaRapida.length}!</p>


        {/* {buscaRapida.length > 0 && (
          <div className="absolute top-full left-0 w-full bg-bege border mt-1 z-50 bg-white">
            {buscaRapida.map((produto, index) => (
              <div key={index} className="bg-bege">
                <LineProduct produto={produto} />
              </div>
            ))}
          </div>
        )} */}
      </PopupDicas>
    </header >
  );

}

export default Header;
