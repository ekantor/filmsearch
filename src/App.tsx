import React, { useState } from 'react';
import SearchBar from './SearchBar';
import MovieInfo from './MovieInfo';
import ResultList from './ResultList';
import ResponseData from './ResponseData';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
	root: {
	  width: '100vw',
	  justifyContent: 'center',
	  alignItems: 'center',
	  display: 'flex',
	  flexDirection: 'column'
	},
	title: {
	  display: 'none',
	  [theme.breakpoints.up('sm')]: {
		display: 'block',
	  },
	},
	progress: {
		marginTop: '1rem'
	}
}));

const App = () => {
	const [items, setItems] = useState([] as MovieInfo[]);
	const [fetching, setFetching] = useState(false);

	const onSubmit = (text: string) => {
		if (text.length === 0) {
			return;
		}
		setFetching(true);
		const apikey = "942359b8";
		fetch(`https://www.omdbapi.com/?apikey=${apikey}&type=movie&s=${text}`)
			.then(res => res.json())
			.then((response: ResponseData) => {
				setFetching(false);
				if (response.Response !== "True") {
					setItems([]);
					return;
				}
				setItems(response.Search);
			})
			.catch((error: any) => {
				setFetching(false);
				console.error('Error:', error)
			});
	}

	const classes = useStyles();
	
	return (
		<React.Fragment>
			<CssBaseline />
			<div className={classes.root}>
				<AppBar position='sticky'>
					<Toolbar>
						<Typography className={classes.title} variant="h5" color="inherit" noWrap>
							MovieSearch
						</Typography>
						<SearchBar onSubmit={onSubmit} />
					</Toolbar>
				</AppBar>
				{fetching ? <CircularProgress className={classes.progress} /> : <ResultList items={items} />}
			</div>
		</React.Fragment>
	);
}

export default App;
