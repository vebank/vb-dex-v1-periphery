var fs = require("fs");

var VeBankV2Router02 = artifacts.require("VeBankV2Router02");
var IERC20 = artifacts.require("IERC20");

const factory = "0x8fd2cEd4f6751FBB29186196c255C667f6636A25"; // From core
const feeToSetter = "0x24d39F8c3c38Df135Fd28078e6A2e2dCF9284FBB";
const rewardAddress = "0x24d39F8c3c38Df135Fd28078e6A2e2dCF9284FBB";
const VVET = "0x0000000000000000000000000000456e65726779";
const tokenAAddress = "0xe88c871CEA576DdD59FA91a744Eb6C6d5b93AB40";
const tokenBAddress = "0x0000000000000000000000000000456e65726779";

const DEPLOY_NEW = false;

function wf(name, address) {
  fs.appendFileSync('.env', name + "=" + address);
  fs.appendFileSync('.env', "\r\n");
}


module.exports = async function (deployer) {
  //require('dotenv').config();
 
  if (DEPLOY_NEW) {
    await deployer.deploy(VeBankV2Router02, factory, VVET);
    var iVeBankV2Router02 = await VeBankV2Router02.deployed();
    wf("iVeBankV2Router02", iVeBankV2Router02.address);
  } else {
    var iVeBankV2Router02 = await VeBankV2Router02.at("0x6159F9399B5b67ce6789E166e29dD54079DEB749");
  }

  // Approve before transfer
  var tokenA = await IERC20.at(tokenAAddress);
  var tokenB = await IERC20.at(tokenBAddress);

  await tokenA.approve(iVeBankV2Router02.address, "10000000000000000000000");
  await tokenB.approve(iVeBankV2Router02.address, "10000000000000000000000");

  // Add pool
  await iVeBankV2Router02.addLiquidity( tokenA.address, tokenB.address, "10000000000000000000000",  "1000000000000000000000",
  "10000000000000000000000",  "1000000000000000000000", rewardAddress, 1657176936)

  console.log("Done!!")
};
