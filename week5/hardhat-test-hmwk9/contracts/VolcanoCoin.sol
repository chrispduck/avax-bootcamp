// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract VolcanoCoin is ERC20("Volcano Coin", "VLC"), Ownable {
    uint256 constant initialSupply = 100000;
    address public admin;

    enum PaymentType {
        unknown,
        basicPayment,
        dividend,
        refund,
        groupPayment
    }

    PaymentType constant defaultType = PaymentType.unknown;
    struct Payment {
        uint256 id; // count from 0
        PaymentType paymentType;
        uint256 timestamp;
        uint256 amount;
        address recipient;
        string comment;
    }

    mapping(address => Payment[]) public payments;
    event supplyChanged(uint256);

    constructor(address _admin) {
        _mint(msg.sender, initialSupply);
        admin = _admin;
    }

    function transfer(address _recipient, uint256 _amount)
        public
        virtual
        override
        returns (bool)
    {
        _transfer(msg.sender, _recipient, _amount);
        addPaymentRecord(msg.sender, _recipient, _amount);
        return true;
    }

    function addPaymentRecord(
        address _sender,
        address _recipient,
        uint256 _amount
    ) internal {
        Payment memory payment = Payment({
            id: getPayments(_sender).length,
            paymentType: defaultType,
            timestamp: block.timestamp,
            amount: _amount,
            recipient: _recipient,
            comment: ""
        });
        payments[_sender].push(payment);
    }

    function addToTotalSupply(uint256 _quantity) public onlyOwner {
        _mint(msg.sender, _quantity);
        emit supplyChanged(_quantity);
    }

    function getPayments(address _user) public view returns (Payment[] memory) {
        return payments[_user];
    }

    function getPayment(address _user, uint256 _id)
        public
        view
        returns (Payment memory)
    {
        require(payments[_user].length >= _id, "payment does not exist");
        return payments[_user][_id];
    }

    function updatePaymentDetails(
        uint256 _id,
        PaymentType _paymentType,
        string calldata _comment
    ) public returns (bool) {
        require(payments[msg.sender].length >= _id, "payment does not exist");
        payments[msg.sender][_id].paymentType = _paymentType;
        payments[msg.sender][_id].comment = _comment;
        return true;
    }

    function updatePaymentTypeAdmin(
        address _sender,
        uint256 _id,
        PaymentType _paymentType
    ) public returns (bool) {
        require(
            msg.sender == admin,
            "updatePaymentTypeAdmin called by non-admin"
        );
        require(payments[_sender].length >= _id, "payment does not exist");
        payments[_sender][_id].paymentType = _paymentType;
        string memory comment = payments[_sender][_id].comment;
        comment = string(abi.encodePacked("updated by admin:", comment));
        payments[_sender][_id].comment = comment;
        return true;
    }
}

