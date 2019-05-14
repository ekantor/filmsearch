import React, { useState } from 'react';
import ResponseData from './ResponseData';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import { withStyles, Theme, createStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';

const SearchBar = (props: { 
	classes: any,
	onResult: (response: ResponseData) => void, 
	onError: (error: any) => void }) => 
{
	const [value, setValue] = useState("");

	const onSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (value.length === 0) {
			return;
		}
		const apikey = "942359b8";
		fetch(`https://www.omdbapi.com/?apikey=${apikey}&type=movie&s=${value}`)
			.then(res => res.json())
			.then(props.onResult)
			.catch(props.onError);
	}

    const { classes } = props;
	return (
		<div>
			<form onSubmit={onSubmit} style={{ display: "inherit", margin: "inherit", padding: "inherit" }}>
				<div className={classes.search}>
					<div className={classes.searchIcon}>
						<SearchIcon />
					</div>
					<InputBase
						placeholder="Enter title"
						classes={{
							root: classes.inputRoot,
							input: classes.inputInput,
						}} 
						onChange={e => setValue(e.target.value)}
					/>
				</div>
				<Button variant="contained" type="submit">
					Search
				</Button>
			</form>
		</div>
	);
}

const styles = (theme: Theme) => createStyles({
	search: {
	  position: 'relative',
	  borderRadius: theme.shape.borderRadius,
	  backgroundColor: fade(theme.palette.common.white, 0.15),
	  '&:hover': {
		backgroundColor: fade(theme.palette.common.white, 0.25),
	  },
	  marginRight: theme.spacing.unit * 2,
	  marginLeft: 0,
	  [theme.breakpoints.up('sm')]: {
		marginLeft: theme.spacing.unit * 3,
		width: 'auto',
	  },
	},
	searchIcon: {
	  width: theme.spacing.unit * 9,
	  height: '100%',
	  position: 'absolute',
	  pointerEvents: 'none',
	  display: 'flex',
	  alignItems: 'center',
	  justifyContent: 'center',
	},
	inputRoot: {
	  color: 'inherit',
	  width: '100%',
	},
	inputInput: {
	  paddingTop: theme.spacing.unit,
	  paddingRight: theme.spacing.unit,
	  paddingBottom: theme.spacing.unit,
	  paddingLeft: theme.spacing.unit * 10,
	  transition: theme.transitions.create('width'),
	  width: '100%',
	  [theme.breakpoints.up('md')]: {
		width: 200,
	  },
	},
});

export default withStyles(styles)(SearchBar);