"use server";

import { GenreType, SeasonType } from "./types";

type createFolderTypes = {
  name: string;
  parent?: number | null;
};

export async function getTMDBData(tmdbId: string) {
  try {
    const url = `https://api.themoviedb.org/3/tv/${tmdbId}`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.TMDB_READ_ACCESS_TOKEN}`,
      },
    };

    const response = await fetch(url, options);
    const data = await response.json();
    if (response.status === 200)
      return {
        title: data.name as string,
        overview: data.overview as string,
        origin: data.origin_country[0],
        poster: data.poster_path,
        backdrop: data.backdrop_path,
        genres: data.genres.map((genre: GenreType) => genre.name),
        number_of_seasons: data.number_of_seasons,
        rating: data.vote_average,
        // vote_count: data.vote_count,
        seasons: data.seasons.map((season: SeasonType) => ({
          season_number: season.season_number,
          name: season.name,
          overview: season.overview,
          air_date: season.air_date,
          episode_count: season.episode_count,
          poster: season.poster_path,
          rating: season.vote_average,
        })),
      };
    return null;
  } catch (e) {
    console.log(e);
  }
}

export async function getSeriesSeasonData(
  tmdbId: string,
  seasonNumber: number
) {
  try {
    const url = `https://api.themoviedb.org/3/tv/${tmdbId}/season/${seasonNumber}`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.TMDB_READ_ACCESS_TOKEN}`,
      },
    };

    const response = await fetch(url, options);
    const data = await response.json();
    if (response.status === 200)
      return data.episodes.map(
        (episode: {
          name: string;
          overview: string;
          air_date: string;
          episode_number: number;
          vote_average: number;
          still_path: string;
        }) => ({
          name: episode.name,
          overview: episode.overview,
          poster: episode.still_path,
          episode_number: episode.episode_number,
          rating: episode.vote_average,
        })
      );

    return null;
  } catch (e) {
    console.log(e);
  }
}

export const getUploadServer = async () => {
  try {
    const url = `${process.env.FILEMONN_API_BASE_URL}upload/server?key=${process.env.FILEMONN_API_KEY}`;
    const options = {
      method: "GET",
    };

    const res = await fetch(url, options);
    const data = await res.json();
    if (res.status === 200) {
      return data.result;
    }
  } catch (error) {
    console.log(error);
  }
};

export const createFolder = async ({ info }: { info: createFolderTypes }) => {
  console.log(info);
  try {
    const url = `${process.env.FILEMONN_API_BASE_URL}api/folder/create?key=${process.env.FILEMONN_API_KEY}${info.parent ? `&parent_id=${info.parent}` : ''}&name=${info.name}`;
    console.log(url);
    // const options = {
    //   method: "POST",
    // };

    // const res = await fetch(url, options);
    // const data = await res.json();
    // if (res.status === 200) {
    //   return data.result;
    // }
  } catch (error) {
    console.log(error);
  }
};
