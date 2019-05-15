import React from 'react';
import MovieDetails from './MovieDetails';
import Link from '@material-ui/core/Link';

const DetailPanel = (props: { movieDetails: MovieDetails, imdbId: string }) => {
	if (props.movieDetails[2].length === 0) 
		return <Link href={"https://www.imdb.com/title/" + props.imdbId} target="_blank" rel="noopener">IMDb</Link>;

	return (
		<div>
			<div>{props.movieDetails[2][0]}</div>
			<div>
				<Link href={"https://www.imdb.com/title/" + props.imdbId} target="_blank" rel="noopener">IMDb</Link>
				<Link href={props.movieDetails[3][0]} target="_blank" rel="noopener">Wikipedia</Link>
			</div>
		</div>
	);
}

export default DetailPanel;