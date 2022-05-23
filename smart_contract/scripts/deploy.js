
const hre = require("hardhat");

const main = async () => {

  const VendingMachine = await hre.ethers.getContractFactory("VendingMachine");
  const machine = await VendingMachine.deploy();

  await machine.deployed();

  console.log("Vending Machine deployed to:", machine.address);
}

  const runMain = async() => {
    try{
      await main();
      process.exit(0);
    }catch(err){
      console.log(err);
      process.exit(1);
    }
  } 
  runMain();