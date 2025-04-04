import Topbar from "@/components/Topbar"
import { useMusicStore } from "@/stores/useMusicStore"
import { useEffect } from "react";
import FeaturedSection from "./components/FeaturedSection";
import { ScrollArea } from "@/components/ui/scroll-area";
import SectionGrid from "./components/SectionGrid";

const HomePage = () => {

  const {
    fetchMadeForYouSongs,
    fetchTrendingSongs,
    fetchFeaturedSongs,
    isLoading,
    madeForYouSongs,
    featuredSongs,
    trendingSongs
  } = useMusicStore();

  useEffect(()=>{
    fetchFeaturedSongs(),
    fetchMadeForYouSongs(),
    fetchTrendingSongs()
  },[fetchFeaturedSongs,fetchMadeForYouSongs,fetchTrendingSongs])
  

  console.log({isLoading,madeForYouSongs,featuredSongs,trendingSongs});

  return (
    <main className="rounded-md overflow-hidden h-full bg-gradient-to-b from-zinc-800 zinc-900">
      <Topbar/>
      <ScrollArea className="h-[calc(100vh-180px)]">
        <div>
          <h1 className="text-2xl sm:text3xl font-bold mb-6">Good Morning</h1>
          <FeaturedSection/>
        </div>
        <div className="space-y-8">
          {/* <p>Made For You</p>
          <p>Trending</p> */}
          <SectionGrid title="Made For You" songs={madeForYouSongs} isLoading={isLoading}/>
          <SectionGrid title="Trending" songs={trendingSongs} isLoading={isLoading}/>
        </div>

      </ScrollArea>
    </main>
  )
}

export default HomePage