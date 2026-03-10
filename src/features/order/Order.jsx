// Test ID: IIDSAT

import { useFetcher, useLoaderData } from 'react-router-dom';
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from '../../utils/helpers';
import { getOrder } from '../../services/apiRestaurant';

import OrderItem from './OrderItem.jsx';
import { useEffect } from 'react';

function Order() {
  const order = useLoaderData();
  const fetcher = useFetcher();
  // Everyone can search for all orders, so for privacy reasons we're gonna exclude names or address, these are only for the restaurant staff
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  useEffect(() => {
    if (!fetcher.data && fetcher.state === 'idle') fetcher.load('/menu');
  }, [fetcher]);

  return (
    <div className="space-y-8 px-4 py-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">Order number #{id} status</h2>

        <div className="space-x-2">
          {priority && (
            <span className="rounded-full bg-red-500 px-3 py-1 text-sm font-semibold tracking-wide text-red-50 uppercase">
              Priority
            </span>
          )}
          <span className="rounded-full bg-green-500 px-3 py-1 text-sm font-semibold tracking-wide text-green-50 uppercase">
            {status} order
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 bg-stone-200 px-6 py-5">
        <p className="font-medium">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : 'Order should have arrived'}
        </p>
        <p className="text-xs text-stone-500">
          (Estimated delivery: {formatDate(estimatedDelivery)})
        </p>
      </div>

      <ul className="divide-y divide-stone-200 border-t border-b">
        {cart.map((item) => (
          <OrderItem
            key={item.pizzaId}
            item={item}
            ingredients={fetcher.data?.find((el) => el.id === item.pizzaId).ingredients}
            isLoadingIngredients={fetcher.state === 'loading'}
          />
        ))}
      </ul>

      <div className="space-y-2 bg-stone-200 px-6 py-5">
        <p className="text-sm font-medium text-stone-600">
          Price pizza: {formatCurrency(orderPrice)}
        </p>
        {priority && (
          <p className="font-bold">
            Price priority: {formatCurrency(priorityPrice)}
          </p>
        )}
        <p>To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}</p>
      </div>
    </div>
  );
}

export async function loader({ params }) {
  const order = await getOrder(params.orderId);
  return order;
}

export default Order;
