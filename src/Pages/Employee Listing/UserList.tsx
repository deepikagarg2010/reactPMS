import React, { useEffect, useState } from 'react';
import UserTable from './UserTable';
import AuthService from '../../Services/AuthService';
import { useNavigate } from "react-router-dom";
import { GlobalToast } from '../../Utils/GlobalToast';

interface User {
  _id: string;
  fname: string;
  lname: string;
  email: string;
  mobile: string;
  age: number;
  address: string;
  gender: string;
  dob: string;
  username: string;
  isadmin: string
}



const initialUsers: User[] = [

];

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const navigate = useNavigate();

  const handleEdit = (user: User) => {
    // Handle edit logic here, e.g., opening a modal to edit user details
    console.log('Editing user:', user);
    navigate("/employess", {state: JSON.stringify({obj:user, isEdit : true}) });
  };

  const handleDelete = async (user: User) => {
    try {
      const response : any = await AuthService.deleteUser(user._id);
      console.log(response);
      if(response.status==200){
        
        GlobalToast(response.data.message)
        getUser()

         
      }
      else{
        GlobalToast(response.data.message)
  
      }
    }catch(err){
      console.log(err);
      
    }
  };

useEffect(()=>{
  getUser()
},[])

//////////get User Ls
  const getUser = async ()=>{ 
    try {
      const response: any = await AuthService.getUser();
      if (response.status == 200) {

      setUsers(response.data.data)

      } else {
        alert(response.data.message);
      }
    } catch (err) {
      console.log(err);
      
    }
  
  }

  return (
    <UserTable users={users} onEdit={handleEdit} onDelete={handleDelete} />
  );
};

export default UserList;
