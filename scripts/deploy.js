const { ethers, run, network } = require("hardhat");

async function main() {
  const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
  console.log("Deploying contract...");
  const simpleStorage = await SimpleStorageFactory.deploy();
  console.log(simpleStorage.target);

  console.log(network.config);
  if (network.config.chainID === 4 && process.env.ETHERSCAN_API_KEY) {
    await simpleStorage.deploymentTransaction().wait(6);
    await verify(simpleStorage.target, []);
  }

  const currentValue = await simpleStorage.retrieve();
  console.log(`CurrentValue is :${currentValue}`);

  const transactionResponse = await simpleStorage.store(8);
  await transactionResponse.wait(1);
  const updatedValue = await simpleStorage.retrieve();
  console.log(`Updated value is ${updatedValue}`);
}

async function verify(contractAddress, args) {
  console.log("Verifying contract...");
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (e) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("Already Verified");
    } else {
      console.log(e);
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
