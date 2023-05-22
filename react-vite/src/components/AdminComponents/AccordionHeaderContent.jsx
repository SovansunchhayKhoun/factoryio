import {AcceptOrderButton} from "../ui/AcceptOrderButton.jsx";
import {DeclineOrderButton} from "../ui/DeclineOrderButton.jsx";
import React from "react";
import {useAuthContext} from "../../context/AuthContext.jsx";

export const AccordionHeaderContent = (props) => {
  const {invProd, setInvProd} = props;
  const {id, date, totalPrice, status, noStock,payment_pic} = props.invoice;
  const {user} = useAuthContext();

  // console.log('acc')
  // console.log(props.invoice)

  return (
    <div className="flex w-full justify-between items-center">
      <div className="font-semibold flex flex-col">
        <div>
          Order ID: {id}
        </div>
        <div>
          Order Date: {date}
        </div>
        <div className="text-tealBase">
          {status === -1 && 'Pending'}
          {status === 1 && 'Accepted'}
          {status === 2 && 'Delivering'}
          {status === 3 && 'Arrived'}
        </div>
      </div>
      <div className="flex flex-col">
        <div className="text-xs text-redBase">
          {/**Insufficient Product Quantity*/}
          {noStock && 'Some of the products are out of stock'}
        </div>
        <div>
          Total Price: <span className="font-bold text-blueBase">${totalPrice}</span>
        </div>
        <div>
          <img width={100} src={`http://127.0.0.1:8000/${payment_pic}`}/>
        </div>
        <div className={`${user.acc_type !== 0 && "hidden"} flex text-whiteFactory gap-x-2 mt-1`}>
          <AcceptOrderButton invProd={invProd} setInvProd={setInvProd} invoice={props.invoice}/>
          <DeclineOrderButton invProd={invProd} setInvProd={setInvProd} invoice={props.invoice}/>
        </div>
      </div>
    </div>
  );
}
