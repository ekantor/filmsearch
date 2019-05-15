import React, { useState } from 'react';
import MovieInfo from './MovieInfo';
import './ResultItem.css';
import MovieDetails from './MovieDetails';
import DetailPanel from './DetailPanel';
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Typography } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

const ResultItem = (props: { item: MovieInfo }) => {
	const [details, setDetails] = useState(["",[],[],[]] as MovieDetails);
	const [fetching, setFetching] = useState(false);

	const onClick = (expanded: boolean) => {
		if (expanded) {
			setFetching(true);
			fetch(`https://en.wikipedia.org/w/api.php?action=opensearch&limit=1&format=json&redirects=resolve&origin=*&search=${props.item.Title}`)
				.then(res => res.json())
				.then((res: MovieDetails) => {
					setFetching(false);
					setDetails(res);
				})
				.catch((error: any) => {
					setFetching(false);
					console.error('Error:', error)
				});
		}
	}

	return (
		<ExpansionPanel onChange={(event: object, expanded: boolean) => onClick(expanded)}>
			<ExpansionPanelSummary>
				<img src={props.item.Poster} alt="" style={{ height: '3rem', marginRight: '1ch' }}/>
				<Typography variant='h6'>
					<div>{`${props.item.Title} (${props.item.Year})`}</div>
				</Typography>
			</ExpansionPanelSummary>
			<ExpansionPanelDetails >
				{fetching ? 
				 	<div style={{display: 'flex', flex: 1, justifyContent: 'center'}}><CircularProgress /></div> : 
					<DetailPanel movieDetails={details} imdbId={props.item.imdbID}/>
				}
			</ExpansionPanelDetails>
		</ExpansionPanel>
	);
}

export default ResultItem;