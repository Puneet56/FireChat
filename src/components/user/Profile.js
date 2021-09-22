import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useState, useRef } from 'react';

function Profile(props) {
	const { currentUser, editProfile } = useAuth();

	const [error, setError] = useState('');

	const emailRef = useRef();
	const passowrdRef = useRef();
	const displayNameRef = useRef();

	const changeHandler = (event) => {
		event.preventDefault();

		editProfile(
			emailRef.current.value,
			passowrdRef.current.value,
			displayNameRef.current.value,
			setError
		);
	};

	return (
		<div
			className={`${
				props.className
					? props.className
					: 'hidden md:block h-screen md:w-1/3 max-h-screen overflow-y-auto bg-gray-600'
			} `}
		>
			<div className='h-1/5 bg-gray-900 text-white flex flex-col items-center justify-center'>
				<img
					alt='user profile'
					className='w-20 h-20 rounded-full'
					src={
						currentUser.photoURL === null
							? `https://avatars.dicebear.com/api/gridy/${currentUser.email.substring(
									0,
									currentUser.email.lastIndexOf('@')
							  )}.svg?background=%239999ff`
							: currentUser.photoURL
					}
				></img>
				<span className='mt-4'>
					{currentUser.displayName === null
						? currentUser.email.substring(0, currentUser.email.lastIndexOf('@'))
						: currentUser.displayName}
				</span>
			</div>
			<div className='flex flex-col items-center justify-start text-white space-y-3'>
				<span className='mt-2'>Name: {currentUser.displayName}</span>
				<input
					ref={displayNameRef}
					className='bg-gray-800 w-3/4 h-8 border-gray-300 border border-solid rounded-sm'
					type='text'
					placeholder='Set Display Name'
				></input>

				<span className='mt-2'>Email: {currentUser.email}</span>
			</div>
			<div>
				<form className='flex flex-col items-center justify-center mt-5 text-white space-y-3 border-top'>
					<label>Enter Email and Password to Save Changes</label>
					<input
						ref={emailRef}
						className='bg-gray-800 w-3/4 h-8 border-gray-300 border border-solid rounded-sm'
						type='text'
						placeholder='Enter email'
					></input>
					<label>Enter Password</label>
					<input
						ref={passowrdRef}
						className='bg-gray-800 w-3/4 h-8 border-gray-300 border border-solid rounded-sm'
						type='password'
						placeholder='Enter Old password'
					></input>

					<button
						onClick={changeHandler}
						className='bg-gray-800 p-2 px-3 rounded-md hover:border-2 border-gray-300 border-solid'
					>
						Save Changes
					</button>
					<p>{error}</p>
				</form>
			</div>
		</div>
	);
}

export default Profile;
