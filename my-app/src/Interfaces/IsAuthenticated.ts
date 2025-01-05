import { AuthType } from "./AuthType";
/**
 * this type is resposnible for wrapping a function that is called back to teh vanigation bar to update the nav bar based on if a user is logged on or not. 
 * for example , the nav bar will say login if a usre isn't currenlty logged in or it will show logout/ the user profile picture if an account is currently
 * logged in 
 */
export type isAuthenticated = {
    setIsAuthenticated: React.Dispatch<React.SetStateAction<AuthType>>;
}