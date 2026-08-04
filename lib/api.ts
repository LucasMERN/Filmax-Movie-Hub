import { apiUrl, fetchData } from './utils';

export const getPerson = async (id: string) => {
  const url = `${apiUrl}/person/${id}&append_to_response=combined_credits`;
  return await fetchData(url);
};

export const getList = async (id: string) => {
  const firstUrl = `${apiUrl}/list/${id}?language=en-US&page=1`;

  const firstPage = await fetchData(firstUrl);
  const totalPages = firstPage.total_pages;

  if (totalPages === 1) {
    return firstPage;
  }

  const urls = [];
  for (let p = 2; p <= totalPages; p++) {
    urls.push(`${apiUrl}/list/${id}?language=en-US&page=${p}`);
  }

  const remainingPages = await Promise.all(urls.map(fetchData));

  const allResults = {
    ...firstPage,
    items: [...firstPage.items, ...remainingPages.flatMap((page) => page.items)],
  };

  return allResults;
};

export const getPersonCredit = async (id: string) => {
  const url = `${apiUrl}/person/${id}/combined_credits`;
  return await fetchData(url);
};

export const getPersonExternalId = async (id: string) => {
  const url = `${apiUrl}/person/${id}/external_ids`;
  return await fetchData(url);
};

export const getRecommended = async (id: string, mediaType: string) => {
  const url = `${apiUrl}/${mediaType}/${id}/recommendations`;
  return await fetchData(url);
};

export const getTop10 = async () => {
  const url = `${apiUrl}/trending/all/week?language=en-US`;
  return await fetchData(url);
};

export const getRelease = async (mediaType: string, id: string) => {
  const url = `${apiUrl}/${mediaType}/${id}/release_dates`;
  return await fetchData(url);
};

export const getContentRating = async (mediaType: string, id: string) => {
  const url = `${apiUrl}/${mediaType}/${id}/content_ratings`;
  return await fetchData(url);
};

export const getSingle = async (mediaType: string, id: string) => {
  const url = `${apiUrl}/${mediaType}/${id}`;
  return await fetchData(url);
};

export const getTvShowEpisodes = async (id: string, season: number) => {
  const url = `${apiUrl}/tv/${id}/season/${season}`;
  return await fetchData(url);
};

export const getTrending = async (media: string, page: number) => {
  const url = `${apiUrl}/trending/${media}/week?page=${page}`;
  return await fetchData(url);
};

export const getNewMovie = async (media: string, page: number) => {
  const url = `${apiUrl}/${media}/upcoming?include_adult=false&include_video=false&language=en-US&page=${page}`;
  return await fetchData(url);
};

export const getNewTV = async (media: string, page: number) => {
  const url = `${apiUrl}/discover/${media}?&include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc&first_air_date.gte=2022-11-01&first_air_date.lte&with_original_language=en`;
  return await fetchData(url);
};

export const getPopular = async (media: string, page: number) => {
  const url = `${apiUrl}/${media}/top_rated?include_adult=false&include_video=false&language=en-US&page=${page}`;
  return await fetchData(url);
};

export const getAnimated = async (media: string, page: number) => {
  const url = `${apiUrl}/discover/${media}?include_adult=false&include_video=false&page=${page}&sort_by=popularity.asc&vote_count.gte=100&with_genres=16&with_original_language=en`;
  return await fetchData(url);
};

export const getMediaByGenre = async (media: string, genreId: string, page: number) => {
  const url = `${apiUrl}/discover/${media}?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc&with_genres=${genreId}`;
  return await fetchData(url);
};

export const searchMedia = async (query: string, page: number) => {
  const url = `${apiUrl}/search/multi?query=${query}&page=${page}`;
  return await fetchData(url);
};

export const searchSpecificMedia = async (mediaType: string, query: string, page: number) => {
  const url = `${apiUrl}/search/${mediaType}?query=${query}&page=${page}`;
  return await fetchData(url);
};

export const getExternalId = async (id: string, mediaType: string) => {
  const url = `${apiUrl}/${mediaType}/${id}/external_ids`;
  return await fetchData(url);
};

export const getYouTubeVideo = async (id: string, mediaType: string) => {
  const url = `${apiUrl}/${mediaType}/${id}/videos`;
  return await fetchData(url);
};

export const getCredits = async (id: string, mediaType: string) => {
  const url = `${apiUrl}/${mediaType}/${id}/credits`;
  return await fetchData(url);
};

export const getWatchProviders = async (id: string) => {
  const url = `${apiUrl}/movie/${id}/watch/providers`;
  return await fetchData(url);
};

export const getRequestToken = async () => {
  const url = `${apiUrl}/authentication/token/new`;
  return await fetchData(url);
};
