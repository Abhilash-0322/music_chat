import { useAuth } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { axiosInstance } from "../lib/axios";
import { Loader } from "lucide-react";
import { useAuthStore } from "@/stores/useAuthStore";

const updateApiToken=(token:string|null)=>{
    if(token){
        axiosInstance.defaults.headers.common['Authorization']=`Bearer ${token}`;
    }
    else{
        delete axiosInstance.defaults.headers.common['Authorization'];
    }
}

const AuthProvider = ({children}:{children:React.ReactNode}) => {

    const {getToken} = useAuth();
    const [loading,setLoading]=useState(true);

    
    useEffect(()=>{
        const initAuth=async()=>{
            try{
                const token=await getToken();
                updateApiToken(token);
                if(token){
                    //todo
                }
            }
            catch(err:any){
                updateApiToken(null);
                // console.log(err);
                console.log("Error in Auth Provider",err);
            }finally{
                setLoading(false);
            }
        }
        initAuth();
    },[getToken,]);
    if(loading){
        return(
            <div className="flex w-full justify-center items-center h-screen">
                <Loader className="size-8 text-emerald-500 animate-spin"/>
            </div>
        )
    }
    return <div>{children}</div>
};

export default AuthProvider;