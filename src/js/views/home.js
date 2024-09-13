import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../store/appContext';

const Home = () => {
	const { store, actions } = useContext(Context);
	const [name, setName] = useState('');
	const [phone, setPhone] = useState('');
	const [email, setEmail] = useState('');
	const [address, setAddress] = useState('');

	useEffect(() => {
		if (store.agendas.length === 0) {
			actions.initAgenda();  // Ensure agendas are initialized
		}
	}, [store.agendas.length, actions]);

	const handleSubmit = (event) => {
		event.preventDefault();
		if (store.agenda.slug) {
			const contact = { name, phone, email, address };
			actions.createContact(store.agenda.slug, contact);
			setName('');
			setPhone('');
			setEmail('');
			setAddress('');
		} else {
			console.error('No agenda available to add the contact');
		}
	};

	return (
		<div className="container mt-5">
			<h1 className="mb-4">Create Contact</h1>
			<form onSubmit={handleSubmit}>
				<div className="mb-3">
					<label className="form-label">Name</label>
					<input type="text" className="form-control" value={name} onChange={(event) => setName(event.target.value)} />
				</div>
				<div className="mb-3">
					<label className="form-label">Phone</label>
					<input type="text" className="form-control" value={phone} onChange={(event) => setPhone(event.target.value)} />
				</div>
				<div className="mb-3">
					<label className="form-label">Email</label>
					<input type="email" className="form-control" value={email} onChange={(event) => setEmail(event.target.value)} />
				</div>
				<div className="mb-3">
					<label className="form-label">Address</label>
					<input type="text" className="form-control" value={address} onChange={(event) => setAddress(event.target.value)} />
				</div>
				<button type="submit" className="btn btn-primary">Create Contact</button>
			</form>
		</div>
	);
};

export default Home;