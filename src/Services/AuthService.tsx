import Config from '../Utils/Config/Config'
import ApiEndPoint from '../Utils/Config/ApiEndPoint'

class AuthService {
    async login(payload : object){
        return Config.post(ApiEndPoint.LOGIN_URL,payload)
    }

    async addUser(payload : object){
        return Config.post(ApiEndPoint.Register_URL,payload)
    }
     
    async getUser (){
        return Config.get(ApiEndPoint.GETUser_URL)
    }

    async updateUser (payload : object , id : any){
        return Config.put(ApiEndPoint.UpdateUser_URL+id, payload)
    }

    async deleteUser (id : any){
        return Config.delete(ApiEndPoint.DeleteUser_URl+id)
    }
}

export default new AuthService()