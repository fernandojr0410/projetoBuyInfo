import React, { useEffect } from 'react';
import Logo from "../../assets/images/logo-buy-info.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import UserProfile from "./components/userProfile";
import ItemsCart from "./components/itemsCart";
import { BiUserCircle } from "react-icons/bi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useState } from "react";
import PopupDicas from "../../components/modal/popupDicas";
import { IoIosInformationCircleOutline } from "react-icons/io";





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
  const [grupos, setGrupos] = useState("")
  const [termoDeBusca, setTermoDeBusca] = useState('');
  const navigate = useNavigate()

  const handlefastSearch = () => {
    const encodedSearchTerm = encodeURIComponent(termoDeBusca);
    console.log(grupos)
    fetch(`http://localhost:5001/product/findByProductGroup?grupos=${grupos}&nome=${encodedSearchTerm}`, {
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
  useEffect(() => {
    if (grupos.startsWith(',')) setGrupos(grupos.slice(1))
    if (grupos.includes(',,')) setGrupos(grupos.replace(',,', ','))
    if (grupos.endsWith(',')) setGrupos(grupos.slice(0, -1))
  }, [grupos])
  return (
    <header className="flex items-center justify-between bg-white w-screen h-24 p-8">
      <Link to="/home">
        <img src={Logo} alt="Logo Buy Info" className="w-56" />
      </Link>

      <div className="flex items-center gap-4">
        <div>
          <button onClick={handleMostrarDicas} className="text-lg flex items-center gap-1">
            <IoIosInformationCircleOutline className="h-6 w-6" />
            <span>Dicas</span></button>
        </div>
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

      <PopupDicas show={mostrarDicas} handleClose={handleMostrarDicas} handleViewProducts={() => { navigate("/dicas", { state: { grupos, result: buscaRapida } }) }}>
        <div className='flex flex-col gap-10 items-center'>
          <div className='flex'>
            <p className='font-bold text-gray-600'>Selecione o tipo de produto que você deseja buscar</p>
          </div>

          <div className='flex'>
            <div className='flex gap-5'>
              <button onClick={() => setGrupos(grupos.includes('gamer') ? grupos.replace('gamer', '') : grupos.concat(grupos.length > 1 ? ',' : '', 'gamer'))} className={grupos.includes('gamer') ? 'bg-green-400' : 'bg-slate-400'}>Gamer</button>
              <button onClick={() => setGrupos(grupos.includes('servidor') ? grupos.replace('servidor', '') : grupos.concat(grupos.length > 1 ? ',' : '', 'servidor'))} className={grupos.includes('servidor') ? 'bg-green-400' : 'bg-slate-400'}>Servidor</button>
              <button onClick={() => setGrupos(grupos.includes('trabalho') ? grupos.replace('trabalho', '') : grupos.concat(grupos.length > 1 ? ',' : '', 'trabalho'))} className={grupos.includes('trabalho') ? 'bg-green-400' : 'bg-slate-400'}>Trabalho</button>
              <button onClick={() => setGrupos(grupos.includes('estudos') ? grupos.replace('estudos', '') : grupos.concat(grupos.length > 1 ? ',' : '', 'estudos'))} className={grupos.includes('estudos') ? 'bg-green-400' : 'bg-slate-400'}>Estudos</button>
              <button onClick={() => setGrupos(grupos.includes('desenvolvimento') ? grupos.replace('desenvolvimento', '') : grupos.concat(grupos.length > 1 ? ',' : '', 'desenvolvimento'))} className={grupos.includes('desenvolvimento') ? 'bg-green-400' : 'bg-slate-400'}>Desenvolvimento</button>
              <button onClick={() => setGrupos(grupos.includes('alta performace') ? grupos.replace('alta performace', '') : grupos.concat(grupos.length > 1 ? ',' : '', 'alta performace'))} className={grupos.includes('alta performace') ? 'bg-green-400' : 'bg-slate-400'}>Alta Performance</button>
            </div>
          </div>
          <div className='flex'>
            <p className='font-bold'>{grupos}</p>
          </div>
        </div>

        <input
          type="text"
          placeholder="Preciso de ajuda com..."
          className="flex w-full border border-gray-300 border-solid p-2 mt-6 outline-none focus:outline-none"
          value={termoDeBusca}
          onChange={(e) => {
            setTermoDeBusca(e.target.value)
            if (e.target.value.length >= 3) {
              handlefastSearch()
            }
            if (e.target.value.length < 3) setBuscaRapida([])
          }}
        />
        <div className='flex justify-center p-3 font-bold'>
          <p>Resultados {buscaRapida.length}!</p>
        </div>
      </PopupDicas>
    </header >
  );

}

export default Header;
