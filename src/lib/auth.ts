import { account, OAuthProvider } from "./appwrite";

export const handleOAuthLogin = () => {
    account.createOAuth2Session({
        provider:OAuthProvider.Google,
        success:`${import.meta.env.VITE_BASE_URL}/drive/home`
    })
}