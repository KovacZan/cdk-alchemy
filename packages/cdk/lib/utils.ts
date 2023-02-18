import { URL } from "url";

function isValidURL(url: string) {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

function urlValidity(url?: string) {
    if (!isValidURL(url!)) {
        throw new Error("ALCHEMY_WEBHOOK_DESTINATION_URL Env Variable is not valid!")
    }
}

export { urlValidity, isValidURL }
