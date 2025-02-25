export interface Genre {
  id: number;
  name: string;
}

export interface MediaInterface {
  id: string | number;
  title: string;
  name: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
  duration: string;
  genres: { id: number; name: string }[];
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  media_type: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date?: string;
  created_by?: Array<{}>;
  episode_run_time?: number[];
  first_air_date?: string;
  homepage?: string;
  in_production?: boolean;
  languages?: string[];
  last_air_date?: string;
  last_episode_to_air?: {
    id: number;
    name: string;
    overview: string;
  };
  next_episode_to_air?: {
    id: number;
    name: string;
    overview: string;
  };
  number_of_episodes?: number;
  number_of_seasons?: number;
  origin_country?: string[];
  original_name?: string;
  production_companies?: Array<{}>;
  production_countries?: Array<{}>;
  seasons?: Array<{}>;
  spoken_languages?: Array<{}>;
  status?: string;
  tagline?: string;
  type?: string;
  videos?: {
    results: Array<{}>;
  };
  vote_average?: number;
  vote_count?: number;
  mediaType?: string;
}

export interface Episodes {
  id: number;
  episode_number: number;
  name: string;
  runtime: number;
  still_path: string;
  overview: string;
  season_number: number;
}
