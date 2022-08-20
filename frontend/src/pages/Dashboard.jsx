import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../components/Spinner";
import AccountInfoForm from "../components/AccountInfoForm";
import {
  reset,
  getAccountInfo,
} from "../features/accountInfo/accountInfoSlice";
import AccountInfoItem from "../components/AccountInfoItem";

function Dashboard() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { accountInfo, isLoading, isError, message } = useSelector(
    (state) => state.accountInfo
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    if (!user) {
      navigate("/login");
    }
    dispatch(getAccountInfo());
    return () => {
      dispatch(reset());
    };
  }, [dispatch, isError, message, navigate, user]);
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <section className="heading">
        <h1>Welcome {user && user.name}</h1>
        <p>AccountInfo Dashboard</p>
      </section>
      <AccountInfoForm />
      <section className="content">
        {accountInfo?.length > 0 ? (
          <div className="accountinfos">
            {accountInfo.map((accountinfo) => (
              <AccountInfoItem
                key={accountinfo._id}
                accountInfo={accountinfo}
              />
            ))}
          </div>
        ) : (
          <h3>No Account Information</h3>
        )}
      </section>
    </>
  );
}

export default Dashboard;
