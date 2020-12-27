
import axios from 'axios'

class HellowWorldService{
    exectueHellowWorldService(){
        return axios.get('http://localhost:8080/hello-world/izzy')
    }
    executeHelloWorldBeanService() {
        //console.log('executed service')
        return axios.get('http://localhost:8080/hello-world-bean');        
    }

    executeHelloWorldPathVariableService(name) {
        //console.log('executed service')
        return axios.get(`http://localhost:8080/hello-world/${name}`);        
    }
}

export default new HellowWorldService()