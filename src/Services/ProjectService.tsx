import Config from '../Utils/Config/Config'
import ApiEndPoint from '../Utils/Config/ApiEndPoint'


class ProjectService{



    async CreateProject(payload : object){
        return Config.post(ApiEndPoint.CreateProject_URl,payload)
    }

    async UpdateProject (payload : object , id  : any){
        return Config.put(ApiEndPoint.UpdateProject_URl + id , payload)
    }

    async DeleteProject (_id : any){
        return Config.delete(ApiEndPoint.DeleteProject_URL +  _id)
    }

    async getProjects (){
        return Config.get(ApiEndPoint.GetAllProjects_URL)
    }

    async assignProjectToUser (obj:any){
        return Config.post(ApiEndPoint.AssignProjectURl, obj)
    }

    async getAssignedProjectById (userId:string){
        return Config.get(ApiEndPoint.GetssignProjectURl+userId)
    }

    async unassignProjectToUser (obj:any){
        return Config.post(ApiEndPoint.unassignProject_URL, obj)
    }

   

}

export default new ProjectService()