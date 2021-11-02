import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

export default function MessageField(props) {
	const { currentUser } = useAuth();
	const { addData } = useData();
	const [loading, setLoading] = useState(false);

	const [enteredMessage, setEnteredMessage] = useState('');

	const sendMessageHandler = async (event) => {
		event.preventDefault();
		setLoading(true);
		try {
			await addData(enteredMessage, currentUser);
			setLoading(false);
		} catch (error) {
			alert('error sending message');
			console.log('error');
			setLoading(false);
		}
		setEnteredMessage('');
		setLoading(false);
	};

	return (
		<div className='h-16 w-full flex items-center justify-center p-1 absolute bottom-0'>
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
					{loading ? 'Sending...' : 'Send'}
				</button>
			</form>
		</div>
	);
}
