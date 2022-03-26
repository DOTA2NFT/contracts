// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
const { sleep } = require("./utils/sleep");

async function main() {
  // We get the contract to deploy
  const HeroInfinityToken = await hre.ethers.getContractFactory(
    "HeroInfinityToken"
  );
  const token = await HeroInfinityToken.deploy();

  await token.deployed();

  await sleep(30000);

  try {
    await hre.run("verify:verify", {
      address: token.address,
      contract: "contracts/HeroInfinityToken.sol:HeroInfinityToken",
    });
  } catch (err) {
    console.log(err);
  }

  console.log("Token deployed to: " + token.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
