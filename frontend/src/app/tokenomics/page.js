// pages/terms.js

import React from 'react';

const Terms = () => {
  return (
    <div className="bg-offwhite min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-3/4">
        <h1 className="text-2xl font-bold mb-4">SuperCoins Tokenomics and Terms & Conditions</h1>

        <p className="mb-4">
          SuperCoins are the fungible tokens issued by RootKart as rewards to any user on completing any transaction.
          All the rules and regulations of use of these tokens are decided and governed by RootKart. These Terms are
          subject to change, at the sole discretion of RootKart, from time to time.
        </p>

        <h2 className="text-xl font-bold mb-2">Tokenomics of SuperCoin:</h2>

        <h3 className="text-lg font-bold mb-2">For Buyer:</h3>
        <ul className="list-disc ml-6 mb-4">
          <li>
            In order to earn SuperCoins on RootKart, You are required to place an order on the Platform, for a minimum of Rs.100 and above (the net order value will be taken into consideration which is the total order value minus canceled/returned item value).
          </li>
          <li>You can also earn SuperCoin by referring other people to RootKart.</li>
          <li>For every Eligible Order in the Platform that You are eligible to earn 2 SuperCoins. For example, for an order value of Rs 100, you earn 2 SuperCoins.</li>
          <li>You can also get SuperCoins from the product sellers in multiple ways.</li>
          <li>A maximum of 50 SuperCoins can be earned in a single Eligible Order from RootKart’s side. For example, for an order value of Rs 2500, you earn 50 SuperCoins.</li>
          <li>SuperCoins earned by you shall be linked to your email id and MetaMask wallet registered with Rootkart.</li>
          <li>SuperCoins will be credited only after the expiry of the return period of all items/products in the Eligible Order.</li>
          <li>If an Eligible Order gets canceled / returned, the related SuperCoins will get reversed.</li>
          <li>You cannot transfer SuperCoins to another buyer in any scenario.</li>
          <li>SuperCoins cannot be converted to cash or used in lieu of cash. SuperCoins are not transferable. Any wrongful transfer of SuperCoins shall be void ab initio.</li>
          <li>SuperCoins can be used across the Platform for availing special incentives and coupons. SuperCoins once used will not be reversed.</li>
        </ul>

        <h3 className="text-lg font-bold mb-2">For Seller:</h3>
        <ul className="list-disc ml-6 mb-4">
          <li>
            In order to earn SuperCoins on RootKart, You are required to sell Products on the Platform, for a minimum of Rs.10000 and above (the net order value will be taken into consideration which is the total order value minus canceled/returned item value).
          </li>
          <li>For every Eligible Sell in the Platform that You are eligible to earn 50 SuperCoins. For example, for an order value of Rs 10000, you earn 50 SuperCoins.</li>
          <li>SuperCoins earned by you shall be linked to your email id and MetaMask wallet registered with Rootkart.</li>
          <li>SuperCoins will be credited only after the expiry of the return period of the product in a Sell.</li>
          <li>If a Sell gets canceled / returned, the related SuperCoins will get reversed.</li>
          <li>You can also buy SuperCoins from RootKart at a price of 2Rs per coin.</li>
          <li>You can send SuperCoins with your Product to the buyers of the product. You can also send SuperCoins to all your Loyal Customers to increase demand for your products and also provide incentives to your customers in the form of Coupons.</li>
          <li>You cannot transfer SuperCoins to another Seller in any scenario.</li>
          <li>SuperCoins cannot be converted to cash or used in lieu of cash. SuperCoins are not transferable to another Seller. Any wrongful transfer of SuperCoins shall be void ab initio.</li>
        </ul>
      </div>
    </div>
  );
};

export default Terms;