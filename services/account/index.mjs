import { ethers, Wallet, utils } from "ethers";
import { SimpleAccountAPI } from '@account-abstraction/sdk'
import entryPointAbi from '../account/abi/entrypointAbi.json'   assert { type: 'json' };
import 'dotenv/config'


const provider = new  ethers.providers.JsonRpcProvider(process.env.MUMBAI_RCP);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider)
const beneficiary = await wallet.getAddress();
const entryPointAddress = entryPointAbi.address
const entryPoint = new ethers.Contract(entryPointAddress, entryPointAbi.abi, wallet);
const factoryAddress = '0x58ed6520958feb1be53c1C30f87C8e659d76ec2f';


export const sendCryto = async () => {
    
}

export const walletUser = (index = 0) => {
    return new SimpleAccountAPI({
        provider,
        entryPointAddress: entryPointAddress,
        owner: wallet,
        factoryAddress, 
        index: ethers.BigNumber.from(index)
    });
}

export const walletAddress = async (index = 0) => {
    const walletApi = walletUser(index);
    return await walletApi.getAccountAddress();
}

export const transferDummy = async(index = 0) => {
    let tranx =  await wallet.sendTransaction({
        to: await walletAddress(index),
        value: utils.parseUnits('0.001', 'ether')
    });

    return tranx;
}