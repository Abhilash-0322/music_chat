import { useAuthStore } from '@/stores/useAuthStore'
import React from 'react'
import Header from './components/Header';
import DashboardStats from './components/DashboardStats';

const AdminPage = () => {

    const {isAdmin,isLoading}=useAuthStore();

    if(!isAdmin&& !isLoading)
        return (
            <div className='flex items-center justify-center h-full'>
                <h1 className='text-2xl font-bold'>You are not authorized to view this page</h1>
            </div>
        )
  return (
    <div className='min-h-screen bg-gradient-to-b from-zinc-900 via-zinc-900 to-black text-zinc-100 p-8'>

    <Header/>
    <DashboardStats/>
    </div>
  )
}

export default AdminPage