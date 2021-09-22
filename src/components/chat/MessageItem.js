import React from 'react';

import { useAuth } from '../../context/AuthContext';

export default function MessageItem(props) {
	const { currentUser } = useAuth();

	const sender = props.item.uid === currentUser.uid;

	return (
		<div className={`w-full flex ${sender ? 'flex-row-reverse' : 'flex-row'}`}>
			<div
				className={`w-max p-2 text-sm flex items-center justify-center rounded-xl bg-gray-800 text-white m-2 ${
					sender ? 'flex-row-reverse' : 'flex-row'
				}`}
			>
				<img
					src={props.item.image}
					className={`w-8 h-8 rounded-full ${sender ? 'ml-2' : 'mr-2'}`}
					alt='t'
				/>
				<div
					className={`flex flex-col justify-between ${
						sender ? 'items-end pr-1 pl-2' : 'items-start pl-1z` pr-2'
					} `}
				>
					<span className='text-xs text-gray-400'>
						{props.item.displayName}
					</span>
					<span>{props.item.text}</span>
				</div>
			</div>
		</div>
	);
}
