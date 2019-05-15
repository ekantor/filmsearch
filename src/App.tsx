import React, { useState } from 'react';
import './App.css';
import SearchBar from './SearchBar';
import MovieInfo from './MovieInfo';
import ResultList from './ResultList';
import ResponseData from './ResponseData';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles, Theme, createStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const App = (props: { classes: any }) => {
	const [items, setItems] = useState([] as MovieInfo[]);
	const [fetching, setFetching] = useState(false);

	const onResult = (response: ResponseData) => {
		setFetching(false);

		if (response.Response !== "True") {
			setItems([]);
			return;
		}

		setItems(response.Search);
	}

	const onError = (error: any) => {
		setFetching(false);
		console.error('Error:', error)
	}

	const onSubmit = (text: string) => {
		if (text.length === 0) {
			return;
		}
		setFetching(true);
		const apikey = "942359b8";
		fetch(`https://www.omdbapi.com/?apikey=${apikey}&type=movie&s=${text}`)
			.then(res => res.json())
			.then(onResult)
			.catch(onError);
	}

    const { classes } = props;

	return (
		<React.Fragment>
			<CssBaseline />
			<div className="App-container column">
				<AppBar position='sticky'>
					<Toolbar>
						<Typography className={classes.title} variant="h5" color="inherit" noWrap>
							MovieSearch
						</Typography>
						<SearchBar onSubmit={onSubmit} />
					</Toolbar>
				</AppBar>
				{fetching ? <CircularProgress style={{ marginTop: '1rem'}}/> : <ResultList items={items} />}
			</div>
		</React.Fragment>
	);
}

const styles = (theme: Theme) => createStyles({
	root: {
	  width: '100%',
	},
	grow: {
	  flexGrow: 1,
	},
	title: {
	  display: 'none',
	  [theme.breakpoints.up('sm')]: {
		display: 'block',
	  },
	},
});

export default withStyles(styles)(App);
