import React, { useState } from 'react';
import IMDbMovieInfo from './types/IMDbMovieInfo';
import CircularProgress from '@material-ui/core/CircularProgress';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
	progressContainer: {
		display: 'flex',
		flex: 1,
		justifyContent: 'center'
	}
});

type WikiInfo = [string, string[], string[], string[]];

const ResultItem = (props: { item: IMDbMovieInfo }) => {
	const [wikiInfo, setWikiInfo] = useState(["",[],[],[]] as WikiInfo);
	const [fetching, setFetching] = useState(false);

	const onClick = (expanded: boolean) => {
		if (expanded) {
			setFetching(true);
			fetch(`https://en.wikipedia.org/w/api.php?action=opensearch&limit=1&format=json&redirects=resolve&origin=*&search=${props.item.Title}`)
				.then(res => res.json())
				.then((res: WikiInfo) => {
					setFetching(false);
					setWikiInfo(res);
				})
				.catch((error: any) => {
					setFetching(false);
					console.error('Error:', error)
				});
		}
	}

	const classes = useStyles();

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
				 	<div className={classes.progressContainer}><CircularProgress /></div> : 
					<Typography>{wikiInfo[2].length > 0 ? wikiInfo[2][0] : "Summary not found."}</Typography> 
				}
			</ExpansionPanelDetails>
			<ExpansionPanelActions>
				<Button href={"https://www.imdb.com/title/" + props.item.imdbID} target="_blank" rel="noopener">IMDb</Button>
				{wikiInfo[3].length > 0 && <Button href={wikiInfo[3][0]} target="_blank" rel="noopener">Wikipedia</Button>}
			</ExpansionPanelActions>
		</ExpansionPanel>
	);
}

export default ResultItem;