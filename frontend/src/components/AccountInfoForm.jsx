import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createAccountInfo } from "../features/accountInfo/accountInfoSlice";

const AccountInfoForm = () => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(text);
    dispatch(createAccountInfo({ text }));
    setText("");
  };
  return (
    <section className="form">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="text">Account Information</label>
          <input
            type="text"
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-block">
            Add Account Information
          </button>
        </div>
      </form>
    </section>
  );
};

export default AccountInfoForm;
