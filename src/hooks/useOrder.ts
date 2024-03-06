import { useEffect, useState } from "react";
import { fetchOrder, fetchOrders } from "../api/order.api";
import { OrderListItem } from "../models/order.model";

export const useOrders = () => {
  const [orders, setOrders] = useState<OrderListItem[]>([]);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);

  useEffect(() => {
    fetchOrders().then((results) => {
      setOrders(results);
    });
  }, []);

  const selectOrderItem = (orderId: number) => {
    if(selectedItemId === orderId){
      setSelectedItemId(null);
    }else{
      setSelectedItemId(orderId);  
    }
      return;
    // 요청 방어
    // if (orders.filter((item) => item.id === orderId)[0].detail) {
    //   setSelectedItemId(orderId);
    //   return;
    // }
    // fetchOrder(orderId).then((orderDetail) => {
    //   setSelectedItemId(orderId);
    //   setOrders(
    //     orders.map((item) => {
    //       if (item.id === orderId) {
    //         return {
    //           ...item,
    //           detail: orderDetail,
    //         };
    //       }
    //       return item;
    //     })
    //   );
    // });
  };

  return { orders, selectOrderItem, selectedItemId };
};
