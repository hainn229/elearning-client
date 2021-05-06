import React from "react";
import PaypalExpressBtn from "react-paypal-express-checkout";

export const PaypalCheckout = (props) => {
  const onSuccess = async (payment) => {
    // Congratulation, it came here means everything's fine!
    return await props.onSuccess(payment);
    // You can bind the "payment" object's value to your state or props or whatever here, please see below for sample returned data
  };

  const onCancel = async () => {
    // User pressed "cancel" or close Paypal's popup!
    // console.log('The payment was cancelled!', data);
    return await props.transactionCanceled();
    // You can bind the "data" object's value to your state or props or whatever here, please see below for sample returned data
  };

  const onError = async (error) => {
    // The main Paypal's script cannot be loaded or somethings block the loading of that script!
    // console.log("Error!", err);
    return await props.transactionError(error);
    // Because the Paypal's main script is loaded asynchronously from "https://www.paypalobjects.com/api/checkout.js"
    // => sometimes it may take about 0.5 second for everything to get set, or for the button to appear
  };

  const env = "sandbox"; // you can set here to 'production' for production
  const currency = "USD"; // or you can set this value from your props or state
  const total = parseFloat(props.total);
  // console.log(parseFloat(this.props.totalCart));
  // parseFloat(this.props.toPay); // same as above, this is the total amount (based on currency) to be paid by using Paypal express checkout
  // Document on Paypal's currency code: https://developer.paypal.com/docs/classic/api/currency_codes/

  const client = {
    sandbox:
      "AZCYHCPLRmzqm38On3hEaSrxzjWM4_g5CZntyPbOxOVgu0DUgkzgc9-giU4tLV33iCDB2Yqd78nBwwjf",
    production: "",
  };

  return (
    <PaypalExpressBtn
      env={env}
      client={client}
      currency={currency}
      total={total}
      onSuccess={onSuccess}
      onError={onError}
      onCancel={onCancel}
      style={{
        size: "medium",
        shape: "rect",
      }}
    />
  );
};
