import React, { useState } from 'react';
import MovieInfo from './MovieInfo';
import CircularProgress from '@material-ui/core/CircularProgress';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

type MovieDetails = [string, string[], string[], string[]];

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
					<Typography>{details[2].length > 0 ? details[2][0] : "Summary not found."}</Typography> 
				}
			</ExpansionPanelDetails>
			<ExpansionPanelActions>
				<Button href={"https://www.imdb.com/title/" + props.item.imdbID} target="_blank" rel="noopener">IMDb</Button>
				{details[3].length > 0 && <Button href={details[3][0]} target="_blank" rel="noopener">Wikipedia</Button>}
			</ExpansionPanelActions>
		</ExpansionPanel>
	);
}

export default ResultItem;