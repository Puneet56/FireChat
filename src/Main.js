import Profile from './components/user/Profile';
import ChatRoom from './components/chat/ChatRoom';

const Main = () => {
	return (
		<div className='w-full min-h-full relative flex flex-row items-center justify-center bg-yellow-400'>
			<ChatRoom />
			<Profile />
		</div>
	);
};

export default Main;
