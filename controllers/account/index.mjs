import { ethers, Wallet, utils } from "ethers";
import { SimpleAccountAPI } from '@account-abstraction/sdk'
import entryPoint from './entrypointAbi.json'   assert { type: 'json' };
import 'dotenv/config'

const provider = new  ethers.providers.JsonRpcProvider(process.env.MUMBAI_RCP);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider)
const beneficiary = await wallet.getAddress();
const entryPointAddress = entryPoint.address
const entryPoint = new ethers.Contract(entryPointAddress, entryPoint.abi, wallet);
const factoryAddress = '0x58ed6520958feb1be53c1C30f87C8e659d76ec2f';

const walletAPI = new SimpleAccountAPI({
    provider,
    entryPointAddress: entryPointAddress,
    owner: wallet,
    factoryAddress, 
    index: ethers.BigNumber.from(index)
});

export const sendCryto = async () => {
    
}

const walletUser = (index = 0) => {
    return walletAPI = new SimpleAccountAPI({
        provider,
        entryPointAddress: entryPointAddress,
        owner: wallet,
        factoryAddress, 
        index: ethers.BigNumber.from(index)
    });
}

const walletAddress = async (index = 0) => {
    const walletApi = walletUser(index);
    return await walletApi.getAccountAddress();
}
