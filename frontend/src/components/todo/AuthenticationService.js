import axios from 'axios'
import {API_URL} from '../../Constant'

export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'

class AuthenticationService {

    exectueBasicAuthenticationService(username, password){
        return axios.get(`${API_URL}/basicauth`,{headers: {authorization: this.createBasicAuthToken(username, password)}})
    }

    exectueJwtAuthenticationService(username, password){
        return axios.post(`${API_URL}/authenticate`,{username, password})
    }

    registerSuccesfullLogin(username, password){
        console.log('registerSuccessfulLogin');
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username);
        this.setupAxiosInterceptors()
    }

    registerSuccesfullLoginForJwt(username, token){
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username);
        this.setupAxiosInterceptorsForJwt(this.createJWTToken(token));
    }


    logout(){
        sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
    }
    isUserLoggedIn(){
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
        if(user === null) return false;
        return true;
    }
    getLoggedInUserName(){
        let user =sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
        if(user === null) return ''
        return user;
    }
    
    createBasicAuthToken(username, password){
        return 'Basic ' +  window.btoa(username + ":" + password)
    }

    createJWTToken(token){
        return 'Bearer ' + token
    }

    setupAxiosInterceptors() {
        let basicAuthHeader = this.createBasicAuthToken('zemser', '123');
        axios.interceptors.request.use(
            (config) => {
                if(this.isUserLoggedIn()) {
                    config.headers.authorization = basicAuthHeader
                }
                return config
            }
        )
    }
    setupAxiosInterceptorsForJwt(token){
        axios.interceptors.request.use(
            (config) => {
                if(this.isUserLoggedIn()) {
                    config.headers.authorization = token
                }
                return config
            }
        )
    }

}

export default new AuthenticationService()