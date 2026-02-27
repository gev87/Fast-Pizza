import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectCartTotals } from './cartSlice';

function CartOverview() {
  const { totalQuantity, totalPrice } = useSelector(selectCartTotals);

  if (totalQuantity === 0) return null;

  return (
    <div className="flex items-center justify-between bg-stone-800 p-4 text-sm text-stone-200 uppercase sm:px-6 md:text-base">
      <p className="space-x-4 font-semibold text-stone-300 sm:space-x-6">
        <span>{totalQuantity} pizzas</span>
        <span>{totalPrice.toFixed(2)}$</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
