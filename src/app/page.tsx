"use client";
import React, { useEffect, useState } from "react";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Navbar,
  Billboard,
  MovieList,
  InfoModal,
  Footer,
} from "@/src/components";
import { useMovieList, useInfoModal } from "@/src/hooks";

export default function Home() {
  const session = useSession();
  const router = useRouter();
  const { data: moviesTrending } = useMovieList("trending", "movie");
  const { data: moviesPopular } = useMovieList("popular", "movie");
  const { data: moviesToprated } = useMovieList("toprated", "movie");
  const { isOpen, closeModal } = useInfoModal();
  const [mediaType, setMediaType] = useState("");

  useEffect(() => {
    if (session?.status !== "authenticated") {
      router.push("/");
    }
  }, [session?.status, router]);

  useEffect(() => {
    const randomMediaType = Math.random() > 0.3 ? "tv" : "movie";
    setMediaType(randomMediaType);
  }, []);

  return (
    <>
      <InfoModal visible={isOpen} onClose={closeModal} />
      <Navbar />
      <Billboard mediaType={mediaType} />
      <div className="pb-40">
        <MovieList title="Trending Now" data={moviesTrending} />
        <MovieList title="Popular on NextFlix" data={moviesPopular} />
        <MovieList title="Top Rated" data={moviesToprated} />
      </div>
      <Footer />
    </>
  );
}
