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
	// const data = [
	// 	{
	// 		uid: '0hpUaD4V6fQNGHMpG0tvj2JwtH62',
	// 		image:
	// 			'https://avatars.dicebear.com/api/gridy/test.svg?background=%239999ff',
	// 		createdAt: { seconds: 1631960059, nanoseconds: 642000000 },
	// 		email: 'test@test.com',
	// 		text: 'hello',
	// 		id: 'Qx5p8ZurQflZcdQTCu0D',
	// 	},
	// 	{
	// 		image:
	// 			'https://avatars.dicebear.com/api/gridy/test.svg?background=%239999ff',
	// 		uid: '0hpUaD4V6fQNGHMpG0tvj2JwtH62',
	// 		createdAt: { seconds: 1631960054, nanoseconds: 143000000 },
	// 		text: 'hello',
	// 		email: 'test@test.com',
	// 		id: 'v5CgEIRX4q4vP28xDlTT',
	// 	},
	// 	{
	// 		email: 'test@test.com',
	// 		uid: '0hpUaD4V6fQNGHMpG0tvj2JwtH62',
	// 		image:
	// 			'https://avatars.dicebear.com/api/gridy/test.svg?background=%239999ff',
	// 		createdAt: { seconds: 1631959671, nanoseconds: 256000000 },
	// 		text: 'j;j;d',
	// 		id: 'W8d5lrdn6n2y7fYcytiq',
	// 	},
	// 	{
	// 		image:
	// 			'https://avatars.dicebear.com/api/gridy/test.svg?background=%239999ff',
	// 		email: 'test@test.com',
	// 		uid: '0hpUaD4V6fQNGHMpG0tvj2JwtH62',
	// 		text: 'dkl;hna;df',
	// 		createdAt: { seconds: 1631959669, nanoseconds: 572000000 },
	// 		id: 'uI0pk0PU6gsREot7IERL',
	// 	},
	// 	{
	// 		text: 'jdlak',
	// 		image:
	// 			'https://avatars.dicebear.com/api/gridy/test.svg?background=%239999ff',
	// 		uid: '0hpUaD4V6fQNGHMpG0tvj2JwtH62',
	// 		email: 'test@test.com',
	// 		createdAt: { seconds: 1631959668, nanoseconds: 141000000 },
	// 		id: 'yxkj32p702XadPEd1roz',
	// 	},
	// 	{
	// 		image:
	// 			'https://avatars.dicebear.com/api/gridy/test.svg?background=%239999ff',
	// 		uid: '0hpUaD4V6fQNGHMpG0tvj2JwtH62',
	// 		createdAt: { seconds: 1631959667, nanoseconds: 56000000 },
	// 		text: 'hello',
	// 		email: 'test@test.com',
	// 		id: 'lQrspxicNUb8j3Qatg6S',
	// 	},
	// 	{
	// 		email: 'test@test.com',
	// 		createdAt: { seconds: 1631959548, nanoseconds: 466000000 },
	// 		image:
	// 			'https://avatars.dicebear.com/api/gridy/test.svg?background=%239999ff',
	// 		text: 'hello',
	// 		uid: '0hpUaD4V6fQNGHMpG0tvj2JwtH62',
	// 		id: 'Vejx2p3AfTSZZqxKsmUB',
	// 	},
	// 	{
	// 		uid: '0hpUaD4V6fQNGHMpG0tvj2JwtH62',
	// 		createdAt: { seconds: 1631959426, nanoseconds: 579000000 },
	// 		email: 'test@test.com',
	// 		text: 'wow',
	// 		image:
	// 			'https://avatars.dicebear.com/api/gridy/test.svg?background=%239999ff',
	// 		id: 'nPrvjsMZHSyWmyKFZ1ot',
	// 	},
	// 	{
	// 		uid: '0hpUaD4V6fQNGHMpG0tvj2JwtH62',
	// 		email: 'test@test.com',
	// 		image:
	// 			'https://avatars.dicebear.com/api/gridy/test.svg?background=%239999ff',
	// 		createdAt: { seconds: 1631959420, nanoseconds: 276000000 },
	// 		text: 'hello',
	// 		id: 'T32Avx9PAU2qsrS7brpt',
	// 	},
	// 	{
	// 		createdAt: { seconds: 1631957548, nanoseconds: 554000000 },
	// 		text: 'Jsjsn',
	// 		image:
	// 			'https://avatars.dicebear.com/api/gridy/mobile.svg?background=%239999ff',
	// 		email: 'mobile@mobile.com',
	// 		uid: '1zhKTV1hU1g4clxV24asIU9XjIM2',
	// 		id: 'xnTNAaFY7loVSzLsxqdP',
	// 	},
	// 	{
	// 		text: 'Usus',
	// 		uid: '1zhKTV1hU1g4clxV24asIU9XjIM2',
	// 		email: 'mobile@mobile.com',
	// 		createdAt: { seconds: 1631957546, nanoseconds: 169000000 },
	// 		image:
	// 			'https://avatars.dicebear.com/api/gridy/mobile.svg?background=%239999ff',
	// 		id: 'WAnxQJKpJ7Xf6cFM863y',
	// 	},
	// 	{
	// 		createdAt: { seconds: 1631957541, nanoseconds: 875000000 },
	// 		uid: '1zhKTV1hU1g4clxV24asIU9XjIM2',
	// 		image:
	// 			'https://avatars.dicebear.com/api/gridy/mobile.svg?background=%239999ff',
	// 		email: 'mobile@mobile.com',
	// 		text: 'Hello',
	// 		id: 'GUU4AqN5VGCVPf50DYT8',
	// 	},
	// 	{
	// 		createdAt: { seconds: 1631957529, nanoseconds: 662000000 },
	// 		email: 'mobile@mobile.com',
	// 		image:
	// 			'https://avatars.dicebear.com/api/gridy/mobile.svg?background=%239999ff',
	// 		uid: '1zhKTV1hU1g4clxV24asIU9XjIM2',
	// 		text: 'Gello',
	// 		id: '0ee9SgJQqwalXnvPeqKW',
	// 	},
	// 	{
	// 		uid: '0hpUaD4V6fQNGHMpG0tvj2JwtH62',
	// 		text: 'bjlbaf',
	// 		email: 'test@test.com',
	// 		image:
	// 			'https://avatars.dicebear.com/api/gridy/test.svg?background=%239999ff',
	// 		createdAt: { seconds: 1631957493, nanoseconds: 866000000 },
	// 		id: '7X1rAACI60HGevqX3eMJ',
	// 	},
	// 	{
	// 		email: 'test@test.com',
	// 		text: 'abhcjlabfc',
	// 		uid: '0hpUaD4V6fQNGHMpG0tvj2JwtH62',
	// 		image:
	// 			'https://avatars.dicebear.com/api/gridy/test.svg?background=%239999ff',
	// 		createdAt: { seconds: 1631957493, nanoseconds: 30000000 },
	// 		id: 'D4GfjRrGdFrvhslLDoPM',
	// 	},
	// 	{
	// 		image:
	// 			'https://avatars.dicebear.com/api/gridy/test.svg?background=%239999ff',
	// 		createdAt: { seconds: 1631957492, nanoseconds: 190000000 },
	// 		text: "hcalbhfjla'",
	// 		uid: '0hpUaD4V6fQNGHMpG0tvj2JwtH62',
	// 		email: 'test@test.com',
	// 		id: 'j1oHq2ADRJ0PscgYXuc0',
	// 	},
	// 	{
	// 		uid: '0hpUaD4V6fQNGHMpG0tvj2JwtH62',
	// 		image:
	// 			'https://avatars.dicebear.com/api/gridy/test.svg?background=%239999ff',
	// 		email: 'test@test.com',
	// 		text: 'hflahfiop',
	// 		createdAt: { seconds: 1631957491, nanoseconds: 222000000 },
	// 		id: '6zbWu7EtVntZjaUs6Y44',
	// 	},
	// 	{
	// 		image:
	// 			'https://avatars.dicebear.com/api/gridy/test.svg?background=%239999ff',
	// 		email: 'test@test.com',
	// 		createdAt: { seconds: 1631957488, nanoseconds: 23000000 },
	// 		text: 'hello',
	// 		uid: '0hpUaD4V6fQNGHMpG0tvj2JwtH62',
	// 		id: 'TCvgKP0G9vfelhDdYVTL',
	// 	},
	// 	{
	// 		image:
	// 			'https://avatars.dicebear.com/api/gridy/test.svg?background=%239999ff',
	// 		text: 'hello',
	// 		uid: '0hpUaD4V6fQNGHMpG0tvj2JwtH62',
	// 		email: 'test@test.com',
	// 		createdAt: { seconds: 1631957451, nanoseconds: 722000000 },
	// 		id: 'KqukKEh0T8azRDX6ToNM',
	// 	},
	// 	{
	// 		email: 'mobile@mobile.com',
	// 		image:
	// 			'https://avatars.dicebear.com/api/gridy/mobile.svg?background=%239999ff',
	// 		createdAt: { seconds: 1631957154, nanoseconds: 822000000 },
	// 		text: 'Hello',
	// 		uid: '1zhKTV1hU1g4clxV24asIU9XjIM2',
	// 		id: 'Uk1go9UwCKw2odMhqEbp',
	// 	},
	// 	{
	// 		uid: '1zhKTV1hU1g4clxV24asIU9XjIM2',
	// 		createdAt: { seconds: 1631957132, nanoseconds: 929000000 },
	// 		email: 'mobile@mobile.com',
	// 		image:
	// 			'https://avatars.dicebear.com/api/gridy/mobile.svg?background=%239999ff',
	// 		text: 'Hello',
	// 		id: 'L6aKOdUgm7NxaeiYioQM',
	// 	},
	// 	{
	// 		uid: '1zhKTV1hU1g4clxV24asIU9XjIM2',
	// 		text: '',
	// 		createdAt: { seconds: 1631957130, nanoseconds: 818000000 },
	// 		image:
	// 			'https://avatars.dicebear.com/api/gridy/mobile.svg?background=%239999ff',
	// 		email: 'mobile@mobile.com',
	// 		id: 'SToijJOEB9oMR4pEZzzx',
	// 	},
	// 	{
	// 		createdAt: { seconds: 1631957088, nanoseconds: 678000000 },
	// 		image:
	// 			'https://avatars.dicebear.com/api/gridy/mobile.svg?background=%239999ff',
	// 		text: 'How',
	// 		email: 'mobile@mobile.com',
	// 		uid: '1zhKTV1hU1g4clxV24asIU9XjIM2',
	// 		id: 'mvmhWhkAQmkaXXqLweV2',
	// 	},
	// 	{
	// 		createdAt: { seconds: 1631957029, nanoseconds: 887000000 },
	// 		email: 'mobile@mobile.com',
	// 		text: 'HELLO',
	// 		uid: '1zhKTV1hU1g4clxV24asIU9XjIM2',
	// 		image:
	// 			'https://avatars.dicebear.com/api/gridy/mobile.svg?background=%239999ff',
	// 		id: 'bIJ3e1I0nu5UcgqrBRAx',
	// 	},
	// 	{
	// 		text: 'this sucks',
	// 		uid: '0hpUaD4V6fQNGHMpG0tvj2JwtH62',
	// 		image:
	// 			'https://avatars.dicebear.com/api/gridy/test.svg?background=%239999ff',
	// 		createdAt: { seconds: 1631956998, nanoseconds: 677000000 },
	// 		email: 'test@test.com',
	// 		id: 'jB5WindTdrf4VZewi4Fa',
	// 	},
	// ];

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
				limit(11)
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
