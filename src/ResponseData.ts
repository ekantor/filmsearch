import MovieInfo from "./MovieInfo";

export default interface ResponseData {
	Error: string,
	Response: string,
	Search: MovieInfo[],
	totalResults: string
}