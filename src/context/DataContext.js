// eslint-disable-next-line
import { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../firebase/firebase';
import { collection, addDoc } from 'firebase/firestore';
import {
	// eslint-disable-next-line
	onSnapshot,
	serverTimestamp,
	// eslint-disable-next-line
	query,
	// eslint-disable-next-line
	orderBy,
	// eslint-disable-next-line
	limit,
} from 'firebase/firestore';
import { useAuth } from './AuthContext';
import LoadingOverlay from 'react-loading-overlay';

const DataContext = createContext();

export const useData = () => {
	return useContext(DataContext);
};

export const DataProvider = (props) => {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);

	const addData = (message, currentUser) => {
		return addDoc(collection(db, 'messages'), {
			text: message,
			createdAt: serverTimestamp(),
			displayName: currentUser.displayName,
			email: currentUser.email,
			uid: currentUser.uid,
			image:
				currentUser.photoURL === null
					? `https://avatars.dicebear.com/api/gridy/${currentUser.email.substring(
							0,
							currentUser.email.lastIndexOf('@')
					  )}.svg?background=%239999ff`
					: currentUser.photoURL,
		});
	};

	// useEffect(
	// 	() =>
	// 		onSnapshot(
	// 			collection(db, 'messages'),
	// 			(snapshot) =>
	// 				setData(
	// 					snapshot.docs.map((doc) => {
	// 						return { ...doc.data(), id: doc.id };
	// 					})
	// 				)
	// 		),
	// 	[]
	// );
	const { currentUser } = useAuth();

	useEffect(() => {
		if (currentUser !== null) {
			setLoading(true);
			const q = query(
				collection(db, 'messages'),
				orderBy('createdAt', 'desc'),
				limit(25)
			);
			return onSnapshot(q, (snapshot) => {
				setData(
					snapshot.docs.map((doc) => {
						return { ...doc.data(), id: doc.id };
					})
				);
				setLoading(false);
			});
		}
	}, [currentUser]);

	const value = {
		addData,
		data,
	};

	return (
		<LoadingOverlay active={loading} spinner text='Loading...'>
			<DataContext.Provider value={value}>
				{props.children}
			</DataContext.Provider>
		</LoadingOverlay>
	);
};
