import {walletAddress} from "../../services/account/index.mjs"

export const wallet = async (req, res) => {
    const phoneNumber = req.params.phoneNumber;
    const address = await walletAddress(phoneNumber);
    const body = {wallet: address}
    return res.status(200).json(body);
}
