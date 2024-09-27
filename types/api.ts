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

export type BaseMedia = {
  id: number;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  vote_count: number;
  genres: Genre[];
  homepage: string | null;
  tagline: string;
  media_type: string;
  popularity: number;
};

export type Movie = BaseMedia & {
  release_date: string;
  imdb_id: string;
  title: string;
};

export type TV = BaseMedia & {
  name: string;
  first_air_date: string;
  last_air_date: string;
  number_of_episodes: number;
  number_of_seasons: number;
  seasons: {
    air_date: string;
    episode_count: number;
    id: number;
    name: string;
    overview: string;
    season_number: number;
  }[];
};

export type MediaData = Movie | TV;

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

export type Cast = {
  name: string;
  profile_path: string;
  id: number;
};
