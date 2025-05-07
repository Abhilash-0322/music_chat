import { useAuthStore } from '@/stores/useAuthStore'
import React from 'react'
import Header from './components/Header';
import DashboardStats from './components/DashboardStats';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Album, Music } from 'lucide-react';

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
    <Tabs defaultValue='songs' className='space-y-6'>
        <TabsList className='p-1 bg-zinc-800/50'>
            <TabsTrigger value={'songs'} className='data-[state=active]:bg-zinc-800'>
                <Music className='mr-2 size-4 '/>
                Songs
            </TabsTrigger>
            <TabsTrigger value={'albums'} className='data-[state=active]:bg-zinc-800'>
                <Album className='mr-2 size-4 '/>
                Albums
            </TabsTrigger>
        </TabsList>
    </Tabs>
    </div>
  )
}

export default AdminPage