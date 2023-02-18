import { Alchemy, Network } from "alchemy-sdk";
import * as net from "net";

function isValidAlchemyNetwork(network: string) {
    return Object.values(Network).includes(network as Network)
}

function checkNetworkValidity(network: string | Network, validNetworks: Network[] | string[]) {
    if (!isValidAlchemyNetwork(network)) {
        throw new Error("ALCHEMY_NETWORK Env Variable is not valid!");
    }
    if (!validNetworks.some(n => n === network)) {
        throw new Error("ALCHEMY_NETWORK Env Variable is not valid for this webhook type!");
    }
}
function initAlchemy(network: Network, apiKey?: string, authToken?: string) {
    if (!apiKey || apiKey.length === 0) {
        throw new Error("ALCHEMY_API_KEY Env Variable is not defined!");
    }

    if (!authToken || authToken.length === 0) {
        throw new Error("ALCHEMY_AUTH_TOKEN Env Variable is not defined!");
    }

    return new Alchemy({
        network,
        apiKey,
        authToken,
    })
}

export { initAlchemy, checkNetworkValidity }
