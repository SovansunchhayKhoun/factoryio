import {Link} from "react-router-dom";
import {useContext} from "react";
import CartContext from "../../context/CartContext.jsx";

export const PendingItem = (props) => {
  const {invoice_product, id, date, status} = props.invoice
  return (
    <>
      {invoice_product.map((inv_prd) => {
        const {products} = inv_prd;
        const {picture, name, qty, price} = products[0];
        return (
          <>
            <div
              className="min-h-[150px] px-12 py-3 flex mb-3 items-center justify-between border-2 border-tealActive shadow-2xl">
              <div className="flex items-center gap-x-6">
                <div className="max-w-[100px]">
                  <img src={`/assets/images/${picture}`} alt=""/>
                </div>
                <div>
                  <Link to={`/maker-io/${products[0].id}`}>
                    <div className="highlight-hover transition duration-150 mb-1 text-tealHover font-bold">{name}</div>
                  </Link>
                  <div className="mb-1 text-blackFactory font-semibold">Order date: <span
                    className="font-normal">{date}</span></div>
                  <div
                    className={`${status === -1 && 'text-redBase'} ${status === 1 && 'text-green-600'} ${status === 2 && 'text-tealBase'} mb-1 font-semibold text-blackFactory`}>
                    {status === -1 && 'Pending'}
                    {status === 1 && 'Accepted'}
                    {status === 2 && 'Delivering'}
                  </div>
                </div>
              </div>
              <p><span className="underline underline-offset-2">Sub-total:</span> <span
                className="font-bold text-redBase">${qty * price}</span></p>
            </div>
          </>
        );
      })}
    </>
  );
};
