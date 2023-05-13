import getWeb3 from "./utils/web3";
import TruffleContract from "truffle-contract";
import DeviceManagerArtifact from "./artifacts/DeviceManager.json";

let web3;
let DeviceManager = new Promise(function(resolve, reject) {
  getWeb3
    .then((results) => {
      web3 = results.web3;
      console.log("web3 = " + web3);
      const deviceManager = TruffleContract(DeviceManagerArtifact);
      deviceManager.setProvider(web3.currentProvider);

      return deviceManager
        .deployed()
        .then((instance) => {
          console.log("Initiating DeviceManager instance...");
          resolve(instance);
        })
        .catch((error) => {
          console.log("error1" + error);
          reject(error);
        });
    })
    .catch((error) => {
      console.log("error2" + error);
      reject(error);
    });
});

export async function getDefaultAccount() {
  return await web3.eth.accounts[0];
}

export default DeviceManager;
