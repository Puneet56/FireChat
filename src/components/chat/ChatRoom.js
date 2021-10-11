import React, { useEffect, useState, useRef } from 'react';
import ChatWindow from './ChatWindow';
import Header from './Header';
import MessageField from './MessageField';

export default function ChatRoom() {
	const [closeRef, setCloseRef] = useState('');

	const total = useRef();

	const getRef = (ref) => {
		setCloseRef(ref);
	};

	useEffect(() => {
		setCloseRef(total);
	}, []);

	return (
		<div
			ref={total}
			// className='h-screen min-h-full w-full sm:w-11/12 md:w-2/3 flex flex-col justify-center overflow-y-auto bg-gray-500 relative'
			className='w-full min-h-screen flex flex-col justify-center overflow-y-auto bg-gray-500 relative'
		>
			<Header closeRef={closeRef} />
			<ChatWindow getRef={getRef} />
			<MessageField />
		</div>
	);
}
