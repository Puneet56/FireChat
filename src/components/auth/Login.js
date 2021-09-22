import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
	const [enteredEmail, setEnteredEmail] = useState('');
	const [enteredPassword, setEnteredPassword] = useState('');

	const { login, currentUser } = useAuth();

	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const history = useHistory();

	const handleSubmit = async (event) => {
		event.preventDefault();
		setEnteredEmail('');
		setEnteredPassword('');
		try {
			setError('');
			setLoading(true);
			await login(enteredEmail, enteredPassword);
			history.push('/');
		} catch (error) {
			setError('failed to login');
			console.log(error);
		}

		setLoading(false);
	};

	console.log('login', currentUser);

	return (
		<div className='h-screen items-center justify-center flex flex-col'>
			{error !== '' && <h1>{error}</h1>}
			<form className='border border-solid rounded-lg m-2 flex flex-col items-center justify-center space-y-4 h-96 w-96'>
				<h1>Login</h1>
				<label>Enter Email</label>
				<input
					className='w-3/4 h-8 border-black border border-solid rounded-sm'
					type='text'
					placeholder='Enter email'
					value={enteredEmail}
					onChange={(event) => setEnteredEmail(event.target.value)}
				></input>
				<label>Enter Password</label>
				<input
					className='w-3/4 h-8 border-black border border-solid rounded-sm'
					type='password'
					placeholder='Enter password'
					value={enteredPassword}
					onChange={(event) => setEnteredPassword(event.target.value)}
				></input>
				<button
					type='submit'
					disabled={loading}
					className='w-36 h-8 mt-5 rounded-sm bg-blue-700 text-center border-solid border border-blue-700'
					onClick={handleSubmit}
				>
					Login
				</button>
				<h2>Do not Have an Account? </h2>
				<Link to='/signup'>
					<button className='w-40 bg-green-500 h-8'>SignUp</button>
				</Link>
			</form>
		</div>
	);
};

export default Login;
