import { useEffect, useState } from "react";
import  Cart  from "../models/cart.model";
import { deleteCart, fetchCart } from "../api/carts.api";
import { useNavigate } from "react-router-dom";

export const useCart = () => {
  const [carts, setCarts] = useState<Cart[]>([]);
  const [isEmpty, setIsEmpty] = useState<boolean>(true);
  const navigate = useNavigate();

  const deleteCartItem = (id: number) => {
    deleteCart(id).then(() => {
      const temp : Cart[] = (carts.filter((cart) => cart.id !== id));
      setCarts(carts.filter((cart) => cart.id !== id));
      temp.length || setIsEmpty(true);
    });
  };

  useEffect(() => {
    fetchCart()
      .then((carts) => {        
        setCarts(carts);
        setIsEmpty(carts.length === 0);
      })
      .catch(() => {
        navigate("/login");
      });
  }, []);

  return { carts, isEmpty, deleteCartItem };
};
