import IMDbMovieInfo from "./IMDbMovieInfo";

export default interface IMDbResponse {
	Error: string,
	Response: string,
	Search: IMDbMovieInfo[],
	totalResults: string
}