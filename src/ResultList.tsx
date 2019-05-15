import React from 'react';
import MovieInfo from './MovieInfo';
import ResultItem from './ResultItem';
import SearchState from './SearchState';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
	topMargin: {
		marginTop: '2rem'
	}
});

const ResultList = (props: { state: SearchState, items: MovieInfo[] }) => {
	const classes = useStyles();

	if (props.state === SearchState.Initial) {
		return null;
	} else if (props.state === SearchState.Fetching) {
		return <CircularProgress className={classes.topMargin}/>;
	} else if (props.state === SearchState.Found) {
		return (
			<div style={{width: '100%'}}>
				{props.items.map(item =>
					<ResultItem item={item} key={item.imdbID} />
				)}
			</div>
		);
	} else if (props.state === SearchState.NotFound) {
		return <Typography variant='h6' className={classes.topMargin}>No results found.</Typography>;
	} else {
		return <Typography variant='h6' className={classes.topMargin}>An error occurred during search.</Typography>;
	}
}

export default ResultList;