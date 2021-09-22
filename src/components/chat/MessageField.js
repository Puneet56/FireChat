import React from 'react';
import { useState } from 'react/cjs/react.development';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

export default function MessageField(props) {
	const { currentUser } = useAuth();
	const { addData } = useData();

	const [enteredMessage, setEnteredMessage] = useState('');

	const sendMessageHandler = (event) => {
		event.preventDefault();
		try {
			addData(enteredMessage, currentUser);
		} catch (error) {
			alert('error sending message');
			console.log('error');
		}
		setEnteredMessage('');
	};

	return (
		<div className='h-16 w-full flex items-center justify-center p-2 absolute bottom-0'>
			<form className='flex w-full h-full items-stretch'>
				<input
					className='w-9/12 h-full border-gray-400 border-solid border-2 bg-gray-600'
					placeholder='enter message'
					onChange={(e) => setEnteredMessage(e.target.value)}
					value={enteredMessage}
				></input>
				<button
					onClick={sendMessageHandler}
					className='mx-auto w-2/12 border-gray-400 border-solid border-2 h-full bg-gray-900 text-white disabled:bg-gray-600 disabled:text-gray-500 disabled:cursor-not-allowed'
					disabled={!enteredMessage}
				>
					SEND
				</button>
			</form>
		</div>
	);
}
