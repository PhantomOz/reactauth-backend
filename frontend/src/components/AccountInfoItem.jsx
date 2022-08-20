import React from "react";
import { useDispatch } from "react-redux";
import { deleteAccountInfo } from "../features/accountInfo/accountInfoSlice";

function AccountInfoItem({ accountInfo }) {
  const dispatch = useDispatch();
  return (
    <div className="accountinfo">
      <div>{new Date(accountInfo.createdAt).toLocaleDateString("en-US")}</div>
      <h2>{accountInfo.text}</h2>
      <button
        onClick={() => dispatch(deleteAccountInfo(accountInfo._id))}
        className="close"
      >
        x
      </button>
    </div>
  );
}

export default AccountInfoItem;
