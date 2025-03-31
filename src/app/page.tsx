"use client";
import OpenGoogleMaps from '@/components/geolocation'
import SplashScreen from '@/components/SplashScreen'
import { useState } from 'react';



function page() {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <div>


{isLoading ? (
        <SplashScreen onFinish={() => setIsLoading(false)} />
      ) : (
        <main >
         <OpenGoogleMaps/>
        </main>
      )}

     
      
    </div>
  )
}

export default page
