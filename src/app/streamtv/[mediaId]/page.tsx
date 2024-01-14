"use client";
import {
  CircleLoader,
  FavoriteButton,
  Navbar,
  Footer,
  VideoModal,
  CircleRating,
  MediaList,
  Cast,
  InfoModal,
} from "@/src/components";
import {
  useCredits,
  useMedia,
  useSimilar,
  useRecommend,
  useInfoModal,
} from "@/src/hooks";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Genre } from "@/src/types";
import Link from "next/link";
import { baseUrl } from "@/public/utils";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { RiMovie2Line } from "react-icons/ri";
import { BsFillPlayFill } from "react-icons/bs";
import { useSession } from "next-auth/react";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
    slidesToSlide: 2,
  },
  tablet: {
    breakpoint: { max: 1024, min: 720 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 720, min: 0 },
    items: 2,
  },
};

const TvSelection = () => {
  const session = useSession();
  const router = useRouter();
  const params = useParams() as { mediaId: string };
  const { mediaId } = params;
  const mediaType = "tv";
  const { data, isLoading } = useMedia(mediaType, mediaId);
  const { data: credits } = useCredits(mediaType, mediaId);
  const { data: mediaRecommended } = useRecommend(mediaType, mediaId);
  const { data: mediaSimilar } = useSimilar(mediaType, mediaId);
  const { isOpen, closeModal } = useInfoModal();
  const [show, setShow] = useState(false);
  const [videoKey, setVideoKey] = useState("");
  const isComingSoon = new Date(data?.first_air_date) > new Date();
  console.log(credits);
  const creator = credits?.crew.filter(
    (f: any) => f.job === "Executive Producer" || f.job === "Producer"
  );
  const key =
    data?.videos?.results.find(
      (video: { type: string }) => video.type === "Trailer"
    )?.key || data?.videos?.results[0]?.key;

  useEffect(() => {
    if (session?.status !== "authenticated") {
      router.push("/auth");
    }
    return () => {
      closeModal();
    };
  }, [session?.status, router, closeModal, mediaId]);

  if (isLoading) {
    return <CircleLoader />;
  }

  return (
    <div className="bg-body min-h-screen">
      <InfoModal visible={isOpen} onClose={closeModal} />
      <Navbar />
      <div className="sm:h-[400px] h-[300px] relative overflow-hidden">
        <div className="absolute left-0 right-0 top-0 bottom-0 bg-gradient-to-b from-transparent via-transparent to-body"></div>
        <img
          src={`${baseUrl}/${data?.backdrop_path}`}
          alt="data?.title"
          className="w-full h-auto"
        ></img>
      </div>
      <div className="max-w-7xl mx-auto p-4 flex flex-col gap-12 pb-12">
        <div className="-mt-[180px] flex sm:flex-row flex-col items-center relative z-10 gap-3">
          <img
            src={`${baseUrl}/${data?.poster_path}`}
            alt="data?.title"
            className="sm:w-[200px] w-36 sm:h-[300px]"
          ></img>
          <div className="mx-auto flex flex-col gap-3">
            <div className="text-white text-3xl md:text-4xl h-full lg:text-5xl font-bold sm:mb-4 text-center">
              {data?.name}
            </div>
            <div className="flex items-center justify-center sm:gap-3 gap-1">
              <p className="text-white font-semibold sm:text-lg">
                {new Date(
                  data?.release_date || data?.first_air_date
                ).getFullYear()}
              </p>
              <span className="text-white">|</span>
              <p className="text-white sm:text-lg">
                {`${data?.number_of_seasons} Seasons`}
              </p>
              <span className="text-white">|</span>
              <p className="text-violet-500 sm:text-lg">
                {data?.genres?.map((genre: Genre) => genre.name).join(", ")}
              </p>
              <div className="sm:absolute right-0">
                {data?.id && (
                  <Link
                    href={`https://www.themoviedb.org/tv/${data?.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500"
                  >
                    <RiMovie2Line size={24} className="lg:hidden" />
                    <RiMovie2Line size={34} className="hidden lg:block" />
                  </Link>
                )}
              </div>
            </div>
            <div className="flex items-center justify-center gap-4">
              {!isComingSoon ? (
                <Link
                  href={`/streamtv/${mediaId}/1/1`}
                  passHref
                  className="bg-white rounded-md py-1 md:py-2 px-2 md:px-4 w-auto text-xs lg:text-lg font-semibold flex flex-row items-center hover:bg-neutral-300 transition text-black"
                >
                  <BsFillPlayFill
                    size={24}
                    className="w-4 md:w-7 text-black mr-1"
                  />
                  Watch Now
                </Link>
              ) : (
                <p className="bg-white rounded-md py-1 md:py-2 px-2 md:px-4w-auto text-xs lg:text-lg font-semibold flex flex-row items-center hover:bg-neutral-300 transition text-black pointer-events-none">
                  Coming Soon
                </p>
              )}
              <div
                onClick={() => {
                  setShow(true);
                  setVideoKey(key);
                }}
                className="bg-white rounded-md py-1 md:py-2 px-2 md:px-4 w-auto text-xs lg:text-lg font-semibold flex flex-row items-center hover:bg-neutral-300 transition text-black cursor-pointer"
              >
                <BsFillPlayFill
                  size={24}
                  className="w-4 md:w-7 text-black mr-1"
                />
                Play Trailer
              </div>
              <VideoModal
                show={show}
                setShow={setShow}
                videoKey={videoKey}
                setVideoKey={
                  setVideoKey as React.Dispatch<
                    React.SetStateAction<string | null>
                  >
                }
              ></VideoModal>
              <div className="sm:w-12 w-8 sm:h-12 h-8">
                <CircleRating rating={data?.vote_average.toFixed(1)} />
              </div>
              <FavoriteButton mediaType="tv" mediaId={data?.id.toString()} />
            </div>
            <div className="text-white drop-shadow-xl px-4">
              <div className="text-2xl mb-2">Overview</div>
              <div className="text-sm md:text-lg text-justify">
                {data?.overview}
              </div>
            </div>
            <div className="flex justify-between relative gap-3 text-white px-4">
              {creator?.length > 0 && (
                <div className="text-sm md:text-lg">
                  <span className="font-bold">Creators: </span>
                  <span className="opacity-60">
                    {creator?.map((d: any, i: number) => (
                      <span key={i}>
                        {d.name}
                        {creator.length - 1 !== i && ", "}
                      </span>
                    ))}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
        <Carousel
          responsive={responsive}
          infinite={true}
          ssr={true}
          containerClass="-mx-[10px]"
          itemClass="px-2"
          removeArrowOnDeviceType={["tablet", "mobile"]}
        >
          {data?.seasons.map(
            (
              season: {
                name: string;
                poster_path: string | null;
                season_number: number;
              },
              i: number
            ) => (
              <Link
                href={`/streamtv/${data.id}/${season.season_number}/1`}
                passHref
                className="block border border-gray-800 rounded shadow hover:bg-gray-800 transition duration-300 relative group hover:scale-105"
                key={i}
              >
                <div className="relative overflow-hidden aspect-w-4 aspect-h-3">
                  <img
                    src={`${baseUrl}/${
                      season?.poster_path || data?.backdrop_path
                    }`}
                    alt={`Season ${season.name} Cover`}
                    className="object-cover w-full h-full group-hover:opacity-70"
                  />
                </div>
                <div className="absolute top-2 left-2 bg-black bg-opacity-60 p-1 rounded">
                  <span className="font-bold text-white">{season.name}</span>
                </div>
              </Link>
            )
          )}
        </Carousel>
      </div>
      <Cast cast={credits?.cast} />
      <MediaList
        title="Recommended TV Shows"
        data={mediaRecommended}
        mediaType="tv"
      />
      <div className="pb-20">
        <MediaList
          title="Similar TV Shows"
          data={mediaSimilar}
          mediaType="tv"
        />
      </div>
      <Footer />
    </div>
  );
};

export default TvSelection;
