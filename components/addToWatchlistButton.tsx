"use client";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";

interface AddToWatchlistProps {
  item: {
    title: string;
    poster_image: string;
    link: string;
  };
}

export default function AddToWatchlist({ item }: AddToWatchlistProps) {
  const [isLoading, setIsLoading] = useState(false);

  const addItem = async () => {
    setIsLoading(true);

    try {
      const response = await fetch("/api/watchlist/item", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to add to watchlist");
      }
    } catch (error) {
      console.error("Error adding to watchlist:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      size="lg"
      variant="outline"
      className="flex w-fit items-center gap-2 px-3 shadow-lg"
      onClick={addItem}
      disabled={isLoading}
    >
      {isLoading ? "Adding..." : "Add to watchlist"}{" "}
      <Plus size={18} strokeWidth={3} />
    </Button>
  );
}
