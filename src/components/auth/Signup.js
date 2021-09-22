import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Signup = () => {
	const [enteredEmail, setEnteredEmail] = useState('');
	const [enteredPassword, setEnteredPassword] = useState('');
	const { signup, currentUser } = useAuth();

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
			await signup(enteredEmail, enteredPassword);
			history.push('/');
		} catch (error) {
			setError('Failed to SignIn');
			console.log(error);
		}

		setLoading(false);
	};

	console.log('signup', currentUser);

	return (
		<div className='h-screen items-center justify-center flex flex-col'>
			{error !== '' && <h1>{error}</h1>}
			<form className='border border-solid rounded-lg m-2 flex flex-col items-center justify-center space-y-3 h-96 w-96'>
				<h1>Signup</h1>
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
					className='w-36 h-8 rounded-sm bg-blue-700 text-center border-solid border border-blue-700'
					onClick={handleSubmit}
				>
					SignUp
				</button>
				<h2>Already Have an Account? </h2>
				<Link to='/login'>
					<button className='w-40 bg-green-500 h-8'>LogIn</button>
				</Link>
			</form>
		</div>
	);
};

export default Signup;
