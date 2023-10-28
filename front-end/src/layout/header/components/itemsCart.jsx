function ItemsCart({ itemsCart }) {
  return (
    <div className="absolute -top-4 -right-2">
      <div className="flex justify-center items-center bg-primary text-white text-sm font-bold rounded-full h-6 w-6">
        {itemsCart}
      </div>
    </div>
  );
}

export default ItemsCart;
