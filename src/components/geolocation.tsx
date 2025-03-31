"use client";
import { useState } from "react";

const OpenGoogleMaps = () => {
  const [loading, setLoading] = useState(false);
  
  const openGoogleMaps = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;

     
        const shopLat = 9.0301;  // Replace with your shop's latitude
        const shopLng = 38.7508; // Replace with your shop's longitude

        // Use Google Maps app deep link for mobile
        const mobileUrl = `geo:${shopLat},${shopLng}?q=${shopLat},${shopLng}`;
        // Fallback URL for desktop browsers
        const desktopUrl = `https://www.google.com/maps/dir/?api=1&origin=${userLat},${userLng}&destination=${shopLat},${shopLng}&travelmode=driving`;

        // Check if the user is on a mobile device
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
    <button
      onClick={openGoogleMaps}
      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      disabled={loading}
    >
      {loading ? "Getting Location..." : "Get Directions"}
    </button>
  );
};

export default OpenGoogleMaps;
