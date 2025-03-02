export type SeasonType = {
    season_number: number;
    name: string;
    overview: string;
    air_date: string;
    episode_count: number;
    poster_path: string;
    vote_average: number;
}

export type GenreType = {
    id: number;
    name: string;
}

export interface SeriesDataType {
    title?: string;
    overview?: string;
    origin: string;
    
    poster?: string;
    backdrop?: string;
    genres?: string[];
    number_of_seasons?: number;
    rating?: number;
    seasons?: { 
        overview: string;
        poster: string;
        name: string;
        season_number: number; 
        episode_count: number; 
        air_date: string;
        rating: number;
    }[];
}


export interface EpisodeType {
    name: string;
    poster: string;
    overview: string;
    episode_number: number;
    rating: number;
}