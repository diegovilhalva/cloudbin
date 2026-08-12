import { account, OAuthProvider } from "./appwrite";


export const handleOAuthLogin = () => {
    account.createOAuth2Session(
        OAuthProvider.Google, // 1º parâmetro: Provedor
        `${import.meta.env.VITE_BASE_URL}/drive/home`, 
        `${import.meta.env.VITE_BASE_URL}/login`       
    );
};
