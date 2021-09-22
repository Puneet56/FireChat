import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase/firebase';
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	onAuthStateChanged,
	signOut,
	reauthenticateWithCredential,
	updateProfile,
	EmailAuthProvider,
} from 'firebase/auth';

const AuthContext = createContext();

export const useAuth = () => {
	return useContext(AuthContext);
};

export const AuthProvider = (props) => {
	const [currentUser, setCurrentUser] = useState();
	const [loading, setLoading] = useState(true);

	const signup = (email, password) => {
		return createUserWithEmailAndPassword(auth, email, password);
	};
	const login = (email, password) => {
		return signInWithEmailAndPassword(auth, email, password);
	};

	const logout = () => {
		return signOut(auth);
	};

	const editProfile = (email, password, newDisplayName, setError) => {
		let credentials = EmailAuthProvider.credential(email, password);

		reauthenticateWithCredential(currentUser, credentials)
			.then(() => {
				if (newDisplayName !== null && newDisplayName !== '') {
					updateProfile(auth.currentUser, {
						displayName: newDisplayName,
					})
						.then(() => {
							setError('DisplayName Updated sucessfully');
							console.log('username updated sucessfully');
						})
						.catch((error) => {
							setError('Error updating Display Name, Try again');
							console.log('error updating username');
							console.log(error);
						});
				}
			})
			.catch((error) => {
				setError('Wrong Credentials');
				console.log(error);
			});
	};

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setCurrentUser(user);
			setLoading(false);
		});
		return unsubscribe;
	}, []);

	const value = {
		currentUser,
		signup,
		login,
		logout,
		editProfile,
	};

	return (
		<AuthContext.Provider value={value}>
			{!loading && props.children}
		</AuthContext.Provider>
	);
};
