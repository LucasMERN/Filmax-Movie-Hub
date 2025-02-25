"use client";

import {
  addToWatchlist,
  checkIfItemInWatchlist,
  removeFromWatchlist,
} from "@/app/actions/watchlist.action";
import { Button } from "@/components/ui/button";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { useState, useTransition, useEffect } from "react";

interface AddToWatchlistProps {
  item: {
    title: string;
    poster_image: string;
    link: string;
  };
  userId: string | undefined;
}

const AddToWatchlist = ({ item, userId }: AddToWatchlistProps) => {
  const [isPending, startTransition] = useTransition();
  const [onWatchlist, setOnWatchlist] = useState<boolean | null>(null);

  useEffect(() => {
    const checkWatchlist = async () => {
      if (!userId) return;

      const isInWatchlist = await checkIfItemInWatchlist(userId, item.link);
      setOnWatchlist(isInWatchlist);
    };

    checkWatchlist();
  }, [item.link, userId]);

  const handleAddToWatchlist = async () => {
    startTransition(async () => {
      const result = await addToWatchlist({
        title: item.title,
        poster_image: item.poster_image,
        link: item.link,
      });
      if (result.success) {
        setOnWatchlist(true);
      } else {
        console.error(result.error);
      }
    });
  };

  const handleRemoveFromWatchlist = async () => {
    startTransition(async () => {
      const result = await removeFromWatchlist(item.link);
      if (result.success) {
        setOnWatchlist(false);
      } else {
        console.error(result.error);
      }
    });
  };

  return (
    <>
      {onWatchlist === null ? (
        <Button
          size="lg"
          variant="outline"
          className="flex w-fit items-center gap-2 px-3 shadow-lg"
          disabled={true}
        >
          Loading...
          <Loader2 size={18} strokeWidth={3} className="animate-spin" />
        </Button>
      ) : onWatchlist ? (
        <Button
          size="lg"
          variant="destructive"
          className="flex w-fit items-center gap-2 px-3 shadow-lg"
          onClick={handleRemoveFromWatchlist}
          disabled={isPending}
        >
          {isPending ? (
            <>
              Loading...
              <Loader2 size={18} strokeWidth={3} className="animate-spin" />
            </>
          ) : (
            <>
              Remove from Watchlist
              <Trash2 size={18} strokeWidth={3} />
            </>
          )}
        </Button>
      ) : (
        <Button
          size="lg"
          variant="outline"
          className="flex w-fit items-center gap-2 px-3 shadow-lg"
          onClick={handleAddToWatchlist}
          disabled={isPending}
        >
          {isPending ? (
            <>
              Loading...
              <Loader2 size={18} strokeWidth={3} className="animate-spin" />
            </>
          ) : (
            <>
              Add to Watchlist
              <Plus size={18} strokeWidth={3} />
            </>
          )}
        </Button>
      )}
    </>
  );
};

const RemoveFromWatchlist = ({ item, userId }: AddToWatchlistProps) => {
  const [isPending, startTransition] = useTransition();

  const handleRemoveFromWatchlist = async () => {
    startTransition(async () => {
      const result = await removeFromWatchlist(item.link);
      if (result.success) {
        return;
      } else {
        console.error("Error removing from watchlist:", result.error);
      }
    });
  };

  return (
    <div
      className={`absolute bottom-0 z-10 flex w-full justify-center bg-transparent from-black transition-all duration-200 group-hover:bg-gradient-to-t ${isPending ? "bg-gradient-to-t from-black" : ""}`}
    >
      <Button
        variant="destructive"
        className={`h-10 w-10 animate-bounce rounded-full bg-destructive p-0 opacity-0 transition-all duration-500 group-hover:mb-8 group-hover:opacity-100 ${isPending ? "mb-8 opacity-100" : ""}`}
        onClick={handleRemoveFromWatchlist}
        disabled={isPending}
      >
        {isPending ? (
          <Loader2 size={18} strokeWidth={3} className="animate-spin" />
        ) : (
          <Trash2 size={18} strokeWidth={3} />
        )}
      </Button>
    </div>
  );
};

export { AddToWatchlist, RemoveFromWatchlist };
