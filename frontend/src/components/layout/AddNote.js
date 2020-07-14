import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import SwipeableViews from 'react-swipeable-views';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Zoom from '@material-ui/core/Zoom';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import UpIcon from '@material-ui/icons/KeyboardArrowUp';
import green from '@material-ui/core/colors/green';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';

import { Consumer } from '../store/index';

function TabContainer(props) {
	const { children, dir } = props;

	return (
		<Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
			{children}
		</Typography>
	);
}

TabContainer.propTypes = {
	children: PropTypes.node.isRequired,
	dir: PropTypes.string.isRequired
};

const styles = (theme) => ({
	root: {
		backgroundColor: theme.palette.background.paper,
		// width: '50%',
		display: 'flex',
		minHeight: 200,
		marginBottom: '10px'
	},
	title: {
		marginLeft: '25px',
		paddingTop: '10px'
	},
	container: {
		display: 'flex',
		flexWrap: 'wrap'
	}
});

class FloatingActionButtonZoom extends React.Component {
	state = {
		value: 0,
		title: '',
		textBody: ''
	};

	handleChangeIndex = (index) => {
		this.setState({ value: index });
	};

	render() {
		const { classes, theme } = this.props;
		const transitionDuration = {
			enter: theme.transitions.duration.enteringScreen,
			exit: theme.transitions.duration.leavingScreen
		};

		const fabs = [
			{
				color: 'primary',
				className: classes.fab,
				icon: <AddIcon />
			},
			{
				color: 'secondary',
				className: classes.fab,
				icon: <EditIcon />
			},
			{
				color: 'inherit',
				className: classNames(classes.fab, classes.fabGreen),
				icon: <UpIcon />
			}
		];

		// console.log(this.state);

		return (
			<Consumer>
				{(value) => {
					const { addNote, handleChange, title, textBody } = value;
					return (
						<div className={classes.root}>
							<Card position="relative" color="default">
								<h4 className={classes.title}>Create a note</h4>

								<TabContainer dir={theme.direction}>
									<form
										onSubmit={addNote}
										className={classes.container}
										noValidate
										autoComplete="off"
										required
									>
										<TextField
											id="standard-required"
											type="text"
											className="form-control form-control-lg"
											label="Give It A Title..."
											name="title"
											margin="normal"
											value={title}
											onChange={handleChange}
										/>
										<TextField
											id="standard-required"
											type="text"
											className="form-control form-control-lg"
											label="What's On Your Mind..."
											name="textBody"
											margin="normal"
											value={textBody}
											onChange={handleChange}
										/>
										{fabs.map((fab, index) => (
											<Zoom
												key={fab.color}
												in={this.state.value === index}
												timeout={transitionDuration}
												style={{
													transitionDelay: `${this.state.value === index
														? transitionDuration.exit
														: 0}ms`
												}}
												unmountOnExit
											>
												<Button
													position="relative"
													variant="fab"
													className={fab.className}
													color={fab.color}
													type="submit"
												>
													{fab.icon}
												</Button>
											</Zoom>
										))}
									</form>
								</TabContainer>
							</Card>
						</div>
					);
				}}
			</Consumer>
		);
	}
}

FloatingActionButtonZoom.propTypes = {
	classes: PropTypes.object.isRequired,
	theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(FloatingActionButtonZoom);
