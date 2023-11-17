import Carregamento from "../../img/loading.svg";

function Loading() {
  return (
    <div className="flex justify-center items-center relative h-screen">
      <img
        className="absolute w-24 h-24 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-2"
        src={Carregamento}
        alt="Carregamento"
      />
    </div>
  );
}

export default Loading;
