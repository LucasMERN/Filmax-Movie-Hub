export type Person = {
  biography: string;
  birthday: string;
  deathday: string | null;
  gender: number;
  homepage: string | null;
  id: number;
  known_for_department: string;
  name: string;
  place_of_birth: string;
  profile_path: string;
};

export type PersonCredit = {
  id: number;
  poster_path: string;
  title: string;
  media_type: string;
  name: string;
};

export type ExternalID = {
  facebook_id: string;
  twitter_id: string;
  instagram_id: string;
  imdb_id: string;
};

export type ReleaseDate = {
  iso_3166_1: string;
  release_dates: {
    certification: string;
    release_date: string;
  }[];
};

export type ContentRating = {
  iso_3166_1: string;
  rating: string;
};

export type Movie = {
  backdrop_path: string;
  genres: Genre[];
  homepage: string | null;
  id: number;
  imdb_id: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  tagline: string;
  title: string;
  vote_count: number;
  vote_average: number;
  media_type: string;
};

export type TV = {
  backdrop_path: string;
  first_air_date: string;
  genres: Genre[];
  homepage: string | null;
  id: number;
  last_air_date: string;
  name: string;
  number_of_episodes: number;
  number_of_seasons: number;
  overview: string;
  popularity: number;
  poster_path: string;
  seasons: {
    air_date: string;
    episode_count: number;
    id: number;
    name: string;
    overview: string;
    season_number: number;
  }[];
  tagline: string;
  vote_count: number;
  vote_average: number;
  media_type: string;
};

export type TvEpisode = {
  id: number;
  name: string;
  still_path: string;
  episode_number: number;
  overview: string;
  air_date: string;
};

export type Genre = {
  id: number;
  name: string;
};

export type YouTubeVideo = {
  name: string;
  key: string;
};

export type Credit = {
  id: number;
  cast: {
    name: string;
    profile_path: string;
  }[];
};

// export type WatchProviders = {

// };
