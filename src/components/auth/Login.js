import { useState } from 'react';
import LoadingOverlay from 'react-loading-overlay';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
	const [enteredEmail, setEnteredEmail] = useState('');
	const [enteredPassword, setEnteredPassword] = useState('');

	const { login } = useAuth();

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
			setError('Failed to login');
			console.log(error);
		}
		setLoading(false);
	};

	return (
		<LoadingOverlay active={loading} spinner text='Loading...'>
			<div className='h-full relative items-center justify-center flex flex-col bg-gray-800 text-white'>
				<div className='text-4xl mb-16'>Welcome to FireChat</div>
				{error !== '' && <h1 className='text-3xl'>{error}</h1>}
				<form className='border border-solid rounded-lg m-2 flex flex-col items-center justify-center space-y-4 py-5 w-96'>
					<h1 className='text-4xl'>Login</h1>
					<label>Enter Email</label>
					<input
						className='w-3/4 h-16 border-4 bg-gray-700 border-gray-400  border-solid rounded-full pl-5 focus:outline-none'
						type='text'
						placeholder='Enter email'
						value={enteredEmail}
						onChange={(event) => setEnteredEmail(event.target.value)}
					></input>
					<label>Enter Password</label>
					<input
						className='w-3/4 h-16 border-4 bg-gray-700 border-gray-400  border-solid rounded-full pl-5 focus:outline-none'
						type='password'
						placeholder='Enter password'
						value={enteredPassword}
						onChange={(event) => setEnteredPassword(event.target.value)}
					></input>
					<button
						type='submit'
						disabled={loading}
						className='w-36 h-12 mt-5 rounded-lg bg-blue-700 text-center border-solid border border-blue-700'
						onClick={handleSubmit}
					>
						Login
					</button>
					<h2 className='text-xl'>Do not Have an Account? </h2>
					<Link to='/signup'>
						<button className='w-40 bg-green-500 h-12 rounded-lg text-xl text-white'>
							SignUp
						</button>
					</Link>
				</form>
			</div>
		</LoadingOverlay>
	);
};

export default Login;
