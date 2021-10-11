import Signup from './components/auth/Signup';
import { AuthProvider } from './context/AuthContext';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './styles/index.css';
import './styles/scrollBar.css';
// import DashBoard from './components/user/DashBoard';
import Login from './components/auth/Login';
import PrivateRoute from './components/auth/PrivateRoute';
import { DataProvider } from './context/DataContext';

import Main from './Main';

const App = () => {
	return (
		<div className='absolute left-0 right-0 bottom-0 top-0 overflow-y-auto overflow-x-hidden`'>
			<Router>
				<AuthProvider>
					<DataProvider>
						<Switch>
							<PrivateRoute exact path='/' component={Main} />
							<Route path='/signup' component={Signup} />
							<Route path='/login' component={Login} />
						</Switch>
					</DataProvider>
				</AuthProvider>
			</Router>
		</div>
	);
};

export default App;
