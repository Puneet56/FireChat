import Profile from './components/user/Profile';
import ChatRoom from './components/chat/ChatRoom';

const Main = () => {
	return (
		<div className='w-full h-full relative flex flex-row items-center justify-center'>
			<ChatRoom />
			<Profile />
		</div>
	);
};

export default Main;
