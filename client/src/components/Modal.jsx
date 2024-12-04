import React, { useState, useEffect } from "react";

const Modal = ({ setModalOpen, contract }) => {
  const [addressList, setAddressList] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState("");

  const sharing = async () => {
    const address = document.querySelector(".address").value;
    await contract.allow(address);
    setModalOpen(false);
  };

  const revokeAccess = async () => {
    if (selectedAddress && selectedAddress !== "People With Access") {
      await contract.disallow(selectedAddress);
      setModalOpen(false); // Close the modal after revoking
    }
  };

  useEffect(() => {
    const accessList = async () => {
      const addressList = await contract.shareAccess();
      setAddressList(addressList);
    };
    contract && accessList();
  }, [contract]);

  return (
    <div>
      <div className="modalBackground fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="modalContainer bg-white rounded-lg shadow-lg w-96 max-w-full p-6 space-y-6">
          {/* Title */}
          <div className="title text-xl font-semibold text-gray-800">
            Share With
          </div>

          {/* Input Field */}
          <div className="body">
            <input
              type="text"
              className="address w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal bg-white text-black"
              placeholder="Enter Address"
            />
          </div>

          {/* Dropdown with Revoke Button */}
          <div className="body flex items-center space-x-4">
            <select
              id="selectNumber"
              value={selectedAddress} // Set the value to the selected address
              onChange={(e) => setSelectedAddress(e.target.value)} // Update state on change
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal bg-white text-black"
            >
              <option value="People With Access">People With Access</option>
              {addressList.map((access, index) => (
                <option key={index} value={access.user}>
                  {access.user}
                </option>
              ))}
            </select>
            <button
              onClick={revokeAccess} // Call revokeAccess with the selected address
              className="bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
            >
              Revoke
            </button>
          </div>

          {/* Footer */}
          <div className="footer flex justify-end space-x-4">
            <button
              onClick={() => setModalOpen(false)}
              id="cancelBtn"
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={sharing}
              className="bg-teal text-white px-4 py-2 rounded-lg hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
