function CadastroEndereco() {
  return (
    <div className="flex flex-col bg-gray-200 p-10 gap-4">
      <div className="flex">
        <h1 className="font-bold text-white bg-primary p-4 rounded-md text-lg w-full">
          Frete e pagamento
        </h1>
      </div>
      <div className="flex bg-white p-4">
        <div className="flex flex-col">
          <div className="flex flex-col">
            <span>
              icone <span>Tipo de entrega</span>
            </span>
            <span>Vendido e Enviado por Netshoes</span>
          </div>
          <div className="flex">
            <span>img produto</span>
            <span>Descricao produto</span>
            <span>cor</span>
            <span>marca</span>
          </div>
          
          {/* <span>tipo frete</span>
          <span>Gratis</span>
          <span>data para chegar</span> */}
        </div>
      </div>
    </div>
  );
}

export default CadastroEndereco;
