import "./bootstrap";
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import ThemeProvider from '@material-ui/styles/ThemeProvider';

const theme = createMuiTheme({
	typography: {
	  	useNextVariants: true,
	},
});

const Theming = () => {
	return (
		<ThemeProvider theme={theme}>
			<App />
		</ThemeProvider>
	);
};

ReactDOM.render(<Theming/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
