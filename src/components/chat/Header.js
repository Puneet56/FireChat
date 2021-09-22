import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { CSSTransition } from 'react-transition-group';
import Profile from '../user/Profile';
import OnOutsiceClick from 'react-outclick';

export default function Header(props) {
	const { currentUser } = useAuth();
	const [showProfile, setShowProfile] = useState(false);
	return (
		<header className='w-full h-16 md:h-20 flex items-center justify-start bg-gray-800 p-2 z-[5] md:p-4 absolute top-0'>
			<h2 className='text-white text-xl md:text-3xl'>#Global Chat</h2>
			<div
				onClick={() => {
					setShowProfile(!showProfile);
				}}
				className='flex items-center w-max md:hidden absolute right-5 cursor-pointer '
			>
				<img
					src={
						currentUser.photoURL === null
							? `https://avatars.dicebear.com/api/gridy/${currentUser.email.substring(
									0,
									currentUser.email.lastIndexOf('@')
							  )}.svg?background=%239999ff`
							: currentUser.photoURL
					}
					alt='user avatar'
					className='w-10 h-10 object-contain rounded-full hover:scale-90 transform transition-all'
				/>
			</div>
			<OnOutsiceClick
				container={props.closeRef}
				onOutsideClick={(e) => {
					setShowProfile(false);
				}}
			>
				<CSSTransition
					in={showProfile}
					mountOnEnter
					unmountOnExit
					classNames='slide-in-right'
					timeout={200}
				>
					<Profile className='w-[calc(20rem-4px)] h-[calc(100vh-3.6rem)] absolute top-0 right-0 bg-gray-600 transform transition-all z-10 shadow-2xl' />
				</CSSTransition>
			</OnOutsiceClick>
		</header>
	);
}
