import { Alchemy, Network } from "alchemy-sdk";

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

function checkAppIdValidity(appId?: string) {
    if (!appId || appId.length === 0) {
        throw new Error("ALCHEMY_APP_ID Env Variable is not defined!");
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

export { initAlchemy, checkNetworkValidity, checkAppIdValidity }
