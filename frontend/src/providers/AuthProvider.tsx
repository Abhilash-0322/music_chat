// import { useAuth } from "@clerk/clerk-react";
// import { useEffect, useState } from "react";
// import { axiosInstance } from "../lib/axios";
// import { Loader } from "lucide-react";
// import { useAuthStore } from "@/stores/useAuthStore";

// const updateApiToken=(token:string|null)=>{
//     if(token){
//         axiosInstance.defaults.headers.common['Authorization']=`Bearer ${token}`;
//     }
//     else{
//         delete axiosInstance.defaults.headers.common['Authorization'];
//     }
// }

// const AuthProvider = ({children}:{children:React.ReactNode}) => {

//     const {getToken} = useAuth();
//     const [loading,setLoading]=useState(true);

    
//     useEffect(()=>{
//         const initAuth=async()=>{
//             try{
//                 const token=await getToken();
//                 updateApiToken(token);
//                 if(token){
//                     //todo
//                 }
//             }
//             catch(err:any){
//                 updateApiToken(null);
//                 // console.log(err);
//                 console.log("Error in Auth Provider",err);
//             }finally{
//                 setLoading(false);
//             }
//         }
//         initAuth();
//     },[getToken,]);
//     if(loading){
//         return(
//             <div className="flex w-full justify-center items-center h-screen">
//                 <Loader className="size-8 text-emerald-500 animate-spin"/>
//             </div>
//         )
//     }
//     return <div>{children}</div>
// };

// export default AuthProvider;

import { axiosInstance } from "@/lib/axios";
import { useAuthStore } from "@/stores/useAuthStore";
import { useChatStore } from "@/stores/useChatStore";
import { useAuth } from "@clerk/clerk-react";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";

const updateApiToken = (token: string | null) => {
	if (token) axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
	else delete axiosInstance.defaults.headers.common["Authorization"];
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const { getToken, userId } = useAuth();
	const [loading, setLoading] = useState(true);
	const { checkAdminStatus } = useAuthStore();
	const { initSocket, disconnectSocket } = useChatStore();

	useEffect(() => {
		const initAuth = async () => {
			try {
				const token = await getToken();
				updateApiToken(token);
				if (token) {
					await checkAdminStatus();
					// init socket
					if (userId) initSocket(userId);
				}
			} catch (error: any) {
				updateApiToken(null);
				console.log("Error in auth provider", error);
			} finally {
				setLoading(false);
			}
		};

		initAuth();

		// clean up
		return () => disconnectSocket();
	}, [getToken, userId, checkAdminStatus, initSocket, disconnectSocket]);

	if (loading)
		return (
			<div className='h-screen w-full flex items-center justify-center'>
				<Loader className='size-8 text-emerald-500 animate-spin' />
			</div>
		);

	return <>{children}</>;
};
export default AuthProvider;