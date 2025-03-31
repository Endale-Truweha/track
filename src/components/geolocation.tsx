"use client";
import { useState } from "react";

export default function ShowShopLocation() {
  const [error, setError] = useState<string | null>(null);

  // Replace with your shop's actual latitude and longitude
  const shopLocation = { lat: 9.0301, lng: 38.7508 }; // Example: Addis Ababa, Ethiopia

  const handleShowDirections = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;

        // Open Google Maps with directions from user to the shop
        window.open(
          `https://www.google.com/maps/dir/?api=1&origin=${userLat},${userLng}&destination=${shopLocation.lat},${shopLocation.lng}&travelmode=driving`,
          "_blank"
        );
      },
      (err) => setError(err.message),
      { enableHighAccuracy: true }
    );
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4 bg-gray-100">
      <h1 className="text-2xl font-bold text-gray-800">Find Your Way to Our Shop 🏪</h1>

      <button
        onClick={handleShowDirections}
        className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600 transition duration-200"
      >
        📍 Get Directions to Our Shop
      </button>

      {error && <p className="text-red-500 text-lg mt-2">{error}</p>}
    </div>
  );
}
