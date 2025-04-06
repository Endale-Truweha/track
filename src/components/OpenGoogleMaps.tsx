"use client";
import { sites } from "@/lib/data";

import { Site } from "@/lib/data";
import Image from 'next/image'
import { Button } from "@/components/ui/button"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useState } from "react";
import { MapPinned } from "lucide-react";

// Define your site interface and list (you can import this from your existing file)

// Create a new type that includes the distance property
interface SiteWithDistance extends Site {
  distance: number; // Add the distance property temporarily
}


// Utility function to convert degrees to radians
const toRad = (x: number) => (x * Math.PI) / 180;

// Haversine formula to calculate the distance between two points
const haversine = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371; // Radius of the Earth in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
};

const OpenGoogleMaps = () => {
  const [sitesSorted, setSitesSorted] = useState<SiteWithDistance[]>([]);
  const [selected, setSelected] = useState("driving") // Default value
  const [loading, setLoading] = useState(false);

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    setLoading(true);

    // Get the user's current location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;

        // Calculate distance and sort sites by proximity
        const sortedSites = sites
          .map((site) => {
            const shopLat = parseFloat(site.Uni_Latitude);
            const shopLng = parseFloat(site.Uni_Longitude);
            const distance = haversine(userLat, userLng, shopLat, shopLng);
            return { ...site, distance };
          })
          .sort((a, b) => a.distance - b.distance); // Sort by ascending distance

        setSitesSorted(sortedSites);
        setLoading(false);
      },
      (error) => {
        alert("Unable to retrieve location: " + error.message);
        setLoading(false);
      }
    );
  };

  const openGoogleMaps = (shopLat: number, shopLng: number) => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    setLoading(true);

    // Get the user's current location to open in Google Maps
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;

        // Construct the URLs based on device type
     
        const desktopUrl = `https://www.google.com/maps/dir/?api=1&origin=${userLat},${userLng}&destination=${shopLat},${shopLng}&travelmode=${selected}`;

      
          window.open(desktopUrl, "_blank");
        

        setLoading(false);
      },
      (error) => {
        alert("Unable to retrieve location: " + error.message);
        setLoading(false);
      }
    );
  };

  return (
    <div className="flex flex-col items-center m-12 container     ">


<Image
        src={"/5G Logo.png"}
        alt="Picture of the author"
     
        fill
        style={{
          objectFit: 'contain',
        }}
      className="-z-20 opacity-10"
      />

     <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Get Directions to Nearest 5G Networks</h1>
      
      {/* Button to trigger geolocation */}
      <div className=" grid grid-cols-1 md:grid-cols-2  place-items-center gap-4">
        
      
      <Button
      variant="outline"
        onClick={handleGetLocation}
       className="rounded-[0] mt-10 scroll-m-20 border-b px-6  py-6 bg-transparent hover:bg-ethGray-200 underline  text-ethBlack-500 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
        disabled={loading}
      >
        {loading ? "Finding Nearest 5G Networks..." : "Find Nearest 5G Networks"}
      </Button>





      <Select value={selected} onValueChange={setSelected}>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Theme" />
  </SelectTrigger>
  <SelectContent>
  <SelectItem value="driving">Driving</SelectItem>
    <SelectItem value="walking">Walking</SelectItem>
   
  </SelectContent>
</Select>


      </div>
      {/* List of buttons for nearest sites */}
      <div className=" grid  grid-cols-2 md:grid-cols-3 lg:grid-cols-4 m-4">
        {sitesSorted.map((site) => (

          <Card
            key={site.SiteID}
            onClick={() =>
              openGoogleMaps(parseFloat(site.Uni_Latitude), parseFloat(site.Uni_Longitude))
            }
         className="m-4 bg-transparent hover:bg-ethGray-100"
          >
  <CardHeader>
<CardTitle>{site.Region}--{site.zone} </CardTitle>
<CardDescription>Site ID : {site.SiteID}</CardDescription>
</CardHeader>

    
<CardContent>
    <p>Distance: {site.distance.toFixed(2)} km</p>
  </CardContent>

  <CardFooter>
    <p className="flex items-center gap-1"><MapPinned color="#8DC63F" /> Map</p>
  </CardFooter>
          </Card>

        ))}
      </div>
      <div className="mb-40"></div>
    </div>
  );
};

export default OpenGoogleMaps;
