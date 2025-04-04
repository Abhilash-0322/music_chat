import {create} from 'zustand';

interface AuthStore {
    isAdmin:boolean;
    // isAuth:boolean;
    isLoading:boolean;
    error:string|null;

    checkAdminStatus:()=>Promise<void>;
    reset:()=>void;
}

export const useAuthStore = create<AuthStore>((set) => ({
    isAdmin:false,
    isLoading:false,
    error:null,

    checkAdminStatus:async()=>{
        set({isLoading:true,error:null});
        try{
            const response = await axiosInstance.get('/admin/check');
            // set({users:response.data});
            set({isAdmin:response.data.admin});
        }
        catch(error:any){
            set({isAdmin:false,error:error.response.data.message});
        }
        finally{
            set({isLoading:false});
        }
    }
}));