import { useState } from "react";
import { REVERSE_GEO, REVERSE_GEO_KEY } from "../lib/helpers";

export function useReverseGeo() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function getLocation(lat: number, lng: number) {
    try {
      setIsLoading(true);
      const res = await fetch(`${REVERSE_GEO}lat=${lat}&lon=${lng}&format=json&apiKey=${REVERSE_GEO_KEY}`);
      
      if (!res.ok) throw new Error("Oops! could't fetch your location Error: " + res.status);
      const data = await res.json();
      setIsLoading(false);
      return data.results[0];
    } catch (err) {
      console.error(err);
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  }
  return { isLoading, error, getLocation };
}