import React from 'react';
import MovieInfo from './MovieInfo';
import ResultItem from './ResultItem';
import './ResultList.css'

const ResultList = (props: { items: MovieInfo[] }) => {
	if (props.items.length === 0) {
		return (
			<div>No results found</div>
		)
	} else {
		return (
			<div className="ResultList column">
				{props.items.map(item =>
					<ResultItem item={item} key={item.imdbID} />
				)}
			</div>
		);
	}
}

export default ResultList;