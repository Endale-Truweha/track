"use client";
import { sites } from "@/lib/data";
import { useState } from "react";
import { Site } from "@/lib/data";
import { Button } from "@/components/ui/button"
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
        const mobileUrl = `geo:${shopLat},${shopLng}?q=${shopLat},${shopLng}`;
        const desktopUrl = `https://www.google.com/maps/dir/?api=1&origin=${userLat},${userLng}&destination=${shopLat},${shopLng}&travelmode=driving`;

        // Open Google Maps depending on the user's device
        if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
          window.location.href = mobileUrl;
        } else {
          window.open(desktopUrl, "_blank");
        }

        setLoading(false);
      },
      (error) => {
        alert("Unable to retrieve location: " + error.message);
        setLoading(false);
      }
    );
  };

  return (
    <div className="flex flex-col items-center m-12 container   ">
      <h1 className="text-2xl font-bold mb-4">Get Directions to Nearest Shops</h1>
      
      {/* Button to trigger geolocation */}
      <Button
        onClick={handleGetLocation}
        className="px-4 py-2 m-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        disabled={loading}
      >
        {loading ? "Finding Nearest Shops..." : "Find Nearest Shops"}
      </Button>

      {/* List of buttons for nearest sites */}
      <div className=" grid  grid-cols-2 md:grid-cols-3 m-4">
        {sitesSorted.map((site) => (
          <Button
            key={site.SiteID}
            onClick={() =>
              openGoogleMaps(parseFloat(site.Uni_Latitude), parseFloat(site.Uni_Longitude))
            }
            className="px-6 py-6 m-4 bg-green-500 text-white rounded-md hover:bg-green-600 my-2"
          >
            {site.SiteID} - {site.Region} - {site.zone} (Distance: {site.distance.toFixed(2)} km)
          </Button>
        ))}
      </div>
    </div>
  );
};

export default OpenGoogleMaps;
