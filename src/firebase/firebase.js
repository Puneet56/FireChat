import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {
	getFirestore,
	enableMultiTabIndexedDbPersistence,
} from 'firebase/firestore';

const firebaseConfig = {
	//your api key

	apiKey: 'AIzaSyCpmtQ5VCMWu87EtJGnOThzWn_dBxtw7So',
	authDomain: 'firechat-7c780.firebaseapp.com',
	projectId: 'firechat-7c780',
	storageBucket: 'firechat-7c780.appspot.com',
	messagingSenderId: '1069506190405',
	appId: '1:1069506190405:web:c677e8f6ec7ddd559d172c',
	measurementId: 'G-343HMQP9M1',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();

export const db = getFirestore();

enableMultiTabIndexedDbPersistence(db).catch((err) => {
	if (err.code === 'failed-precondition') {
		// Multiple tabs open, persistence can only be enabled
		// in one tab at a a time.
		// ...
	} else if (err.code === 'unimplemented') {
		// The current browser does not support all of the
		// features required to enable persistence
		// ...
	}
});
// Subsequent queries will use persistence, if it was enabled successfully

export default app;
