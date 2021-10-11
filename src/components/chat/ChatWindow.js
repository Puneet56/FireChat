import React, { useRef } from 'react';

import { useData } from '../../context/DataContext';
import MessageItem from './MessageItem';

export default function ChatWindow(props) {
	const { data } = useData();
	data.sort((a, b) => b.createdAt - a.createdAt); //descending

	const dummy = useRef();

	return (
		<div className=''>
			<div className='main w-full min-w-full max-h-[calc(100vh-8rem)] flex-grow overflow-y-auto flex justify-start flex-col-reverse'>
				{data.length !== 0 &&
					data.map((item) => {
						if (dummy.current !== undefined) {
							dummy.current.scrollIntoView({ behaviour: 'smooth' });
						}
						return <MessageItem key={item.id} item={item} />;
					})}
			</div>
			<div ref={dummy}> </div>
		</div>
	);
}
