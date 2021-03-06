import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import IMDbMovieInfo from './components/types/IMDbMovieInfo';
import ResultList from './components/ResultList';
import IMDbResponse from './components/types/IMDbResponse';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import makeStyles from '@material-ui/styles/makeStyles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import SearchState from './components/types/SearchState';

const useStyles = makeStyles((theme: Theme) => ({
	root: {
	  width: '100%',
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
}));

const App = () => {
	const [searchState, setSearchState] = useState(SearchState.Initial);
	const [resultItems, setResultItems] = useState([] as IMDbMovieInfo[]);

	const onSubmitSearch = (text: string) => {
		if (text.length === 0) {
			return;
		}
		setSearchState(SearchState.Fetching);
		const apikey = "942359b8";
		fetch(`https://www.omdbapi.com/?apikey=${apikey}&type=movie&s=${text}`)
			.then(res => res.json())
			.then((response: IMDbResponse) => {
				if (response.Response !== "True") {
					setSearchState(SearchState.NotFound);
					return;
				}
				setSearchState(SearchState.Found);
				setResultItems(response.Search);
			})
			.catch((error: any) => {
				setSearchState(SearchState.Error);
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
						<SearchBar onSubmit={onSubmitSearch} />
					</Toolbar>
				</AppBar>
				<ResultList state={searchState} items={resultItems} />
			</div>
		</React.Fragment>
	);
}

export default App;
