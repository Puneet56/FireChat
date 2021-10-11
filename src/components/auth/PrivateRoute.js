import { Redirect, Route } from 'react-router';
import { useAuth } from '../../context/AuthContext';

const PrivateRoute = ({ component: Component, ...rest }) => {
	const { currentUser } = useAuth();

	return (
		<Route
			{...rest}
			render={(props) => {
				return currentUser ? (
					<Component {...props} />
				) : (
					<Redirect to='/register' />
				);
			}}
		></Route>
	);
};

export default PrivateRoute;
