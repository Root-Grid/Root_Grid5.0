// SPDX-License-Identifier: GPL-3.0

// pragma solidity >=0.7.0 <0.9.0;
pragma solidity ^0.8.9;

import "hardhat/console.sol";

/**
 * @title Owner
 * @dev Set & change owner
 */
contract Supercoin {

    enum roles {
        admin,
        buyer,
        seller
    }

    enum transaction_type {
        credit,
        debit
    }

    enum status {
        active,
        inactive,
        deleted
    }

    struct history_entry {
        string desc;
        int256 balance_before;
        int256 balance_after;
        transaction_type credit_or_debit;
        string transaction_id;
        int256 timestamp;
    }

    struct participant {
        address wallet;
        string name;
        string id;
        history_entry[] history;
        int256 balance;
        roles role;
        status current_status;
    }

    string[] public seller_ids;
    string[] public buyer_ids;
    mapping(string => participant) public all_participants;
    int256 value_of_one_coin = 10;
    int256 total_supply = 0;

    constructor( int256 _value ) {
        total_supply = _value;
    }

    function getParticipantDetails( string calldata _id ) external view returns (participant memory) {
        require(bytes(all_participants[_id].id).length>0, "Invalid Id");
        return all_participants[_id];
    }

    function checkParticipantInternal(string calldata _id) internal view returns (bool) {
        if(bytes(all_participants[_id].name).length > 0) {
            return true;
        } else {
            return false;
        }
    }

    function referralReward (string calldata _referrer, string calldata _referred_to, int256 _timestamp) public {
        addBalance(_referrer, 50, string(abi.encodePacked("Referral Reward coins awarded for referral to",' ',_referred_to)), _timestamp);
        addBalance(_referred_to, 50, string(abi.encodePacked("Referral Reward coins awarded for referral from",' ',_referrer)), _timestamp);
        _mint(100);
    }

    function registerParticipant (string calldata _name, string calldata _id, string calldata _role, int256 _timestamp) public returns (participant memory) {
        require(bytes(_name).length>0, "Name can't be empty");
        require(bytes(_id).length>0, "Id can't be empty");
        require(bytes(_role).length>0, "Role can't be empty");

        if(checkParticipantInternal(_id)) {
            return all_participants[_id];
        }

        all_participants[_id].wallet = msg.sender;
        all_participants[_id].name = _name;
        all_participants[_id].id = _id;
        all_participants[_id].history.push(history_entry("Account Created", 0, 0, transaction_type.credit, "-1", _timestamp));
        all_participants[_id].balance = 0;
        all_participants[_id].role = keccak256(abi.encodePacked(_role)) == keccak256(abi.encodePacked("seller")) ? roles.seller : roles.buyer;
        all_participants[_id].current_status = status.active;

        if(keccak256(abi.encodePacked(_role)) == keccak256(abi.encodePacked("seller"))){
            seller_ids.push(_id);
        } else {
            buyer_ids.push(_id);
        }
        return all_participants[_id];
    }

    function _mint (int256 amount) internal {
        // check conditions
        total_supply += amount;
    }

    function subtractBalance (string calldata _id, int256 amount, string memory desc, int256 _timestamp) public {
        // check conditions
        require(checkParticipantInternal(_id) == true, "User does not exist");
        all_participants[_id].history.push(history_entry(desc, all_participants[_id].balance, all_participants[_id].balance-amount, transaction_type.debit, "-1", _timestamp));
        all_participants[_id].balance -= amount;
    }

    function addBalance (string calldata _id, int256 amount, string memory desc, int256 _timestamp) public {

        require(checkParticipantInternal(_id) == true, "User does not exist");
        all_participants[_id].history.push(history_entry(desc, all_participants[_id].balance, all_participants[_id].balance+amount, transaction_type.credit, "-1", _timestamp));
        all_participants[_id].balance += amount;
    }

    function claimCoins(string calldata _buyerId, string calldata _orderId, int256 coinsFlipkart, int256 coinsSeller, string calldata _sellerId, int256 _timestamp) public {
        // Check conditions
        
        _mint(coinsFlipkart);
        subtractBalance(_sellerId, coinsSeller, string(abi.encodePacked("Claim Coins transferred to Buyer:",' ',_buyerId)), _timestamp);
        addBalance(_buyerId, coinsFlipkart, string(abi.encodePacked("Claim Coins awarded for order:",' ',_orderId)), _timestamp);
        addBalance(_buyerId, coinsSeller, string(abi.encodePacked("Claim Coins awarded by seller for order:",' ',_orderId)), _timestamp);

    }

    function toLoyalCustomers (string[] calldata _customer_ids, string calldata _seller_id, int256 _number_of_coins, int256 _timestamp) public {
        // check conditions
        uint256 arrayLength = _customer_ids.length;
        for (uint i=0; i<arrayLength; i++) {
            subtractBalance(_seller_id, _number_of_coins, string(abi.encodePacked("Loyalty Coins transferred to Buyer:",' ',_customer_ids[i])), _timestamp);
            addBalance(_customer_ids[i], _number_of_coins, string(abi.encodePacked("Loyalty Coins awarded by seller:",' ',_seller_id)), _timestamp);
        }
    }

    function buyCoupon(string calldata _customer_id, int256 amount, string calldata _couponId, int256 _timestamp) public {
        require(amount>0, "Coupon cost can't be less than 1 supercoin");
        subtractBalance(_customer_id, amount, string(abi.encodePacked("Coupon Paid for coupon:",' ',_couponId)), _timestamp);
    }

}