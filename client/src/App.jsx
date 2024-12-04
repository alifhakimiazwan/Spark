import { useState, useEffect, useRef } from "react";
import { ethers } from "ethers";
import Upload from "./artifacts/contracts/Upload.sol/Upload.json";
import FileUpload from "./components/FileUpload";
import Display from "./components/Display";
import Modal from "./components/Modal";
import Navbar from "./components/Navbar";
import "./App.css"; // Import the CSS file
import Hero from "./components/Hero";

function App() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const accountSectionRef = useRef(null);

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const loadProvider = async () => {
      if (provider) {
        window.ethereum.on("chainChanged", () => {
          window.location.reload();
        });

        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        console.log(address);
        setAccount(address);
        let contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

        const contract = new ethers.Contract(
          contractAddress,
          Upload.abi,
          signer
        );
        console.log(contract);
        setContract(contract);
        setProvider(provider);
      } else {
        console.error("Metamask is not installed");
      }
    };
    provider && loadProvider();
  }, []);

  return (
    <>
      <Navbar scrollToRef={accountSectionRef} />
      <Hero scrollToRef={accountSectionRef} />
      <div className="container mx-auto py-20" ref={accountSectionRef}>
        <h1 className="text-4xl text-navy font-bold pb-4">Upload Documents</h1>
        <div className="bg-white shadow-md rounded-2xl p-6 mb-4 flex items-center">
          <p className="text-navy flex-grow text-left">
            <span className="font-medium text-xl">Account :</span>
            <span className="font-light text-xl text-gray-400 ml-2">
              {account ? account : "Not connected"}
            </span>
          </p>
          {!modalOpen && (
            <button
              className="share btn bg-teal text-white font-light py-2 px-7 rounded-lg"
              onClick={() => setModalOpen(true)}
            >
              Share
            </button>
          )}
          {modalOpen && (
            <Modal setModalOpen={setModalOpen} contract={contract}></Modal>
          )}
        </div>
        <FileUpload account={account} provider={provider} contract={contract} />
        <Display account={account} contract={contract} />
      </div>
    </>
  );
}

export default App;
