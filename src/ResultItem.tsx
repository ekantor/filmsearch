import React, { useState } from 'react';
import MovieInfo from './MovieInfo';
import './ResultItem.css';
import MovieDetails from './MovieDetails';
import DetailPanel from './DetailPanel';
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Typography } from '@material-ui/core';

const ResultItem = (props: { item: MovieInfo }) => {
	const [details, setDetails] = useState(["",[],[],[]] as MovieDetails);

	const onClick = (expanded: boolean) => {
		if (expanded) {
			fetch(`https://en.wikipedia.org/w/api.php?action=opensearch&limit=1&format=json&redirects=resolve&origin=*&search=${props.item.Title}`)
				.then(res => res.json())
				.then((res: MovieDetails) => setDetails(res))
				.catch((error: any) => console.error('Error:', error));
		}
	}

	return (
		<ExpansionPanel className="ResultItem-panel" onChange={(event: object, expanded: boolean) => onClick(expanded)}>
			<ExpansionPanelSummary className="ResultItem-summary">
				<img src={props.item.Poster} alt="" style={{ height: '3rem', marginRight: '1ch' }}/>
				<Typography variant='h6'>
					<div>{`${props.item.Title} (${props.item.Year})`}</div>
				</Typography>
			</ExpansionPanelSummary>
			<ExpansionPanelDetails>
				<DetailPanel movieDetails={details} imdbId={props.item.imdbID} />
			</ExpansionPanelDetails>
		</ExpansionPanel>
	);
}

export default ResultItem;