import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../store/appContext';
import ContactCard from './single'; // import contact card component, which maybe I could change folders and not as a view

const Demo = () => {
	const { store, actions } = useContext(Context);

	useEffect(() => {
		if (store.agendas.length === 0) {
			actions.getUserAgenda();  // Ensure agenda is initialized by user input, if needed given that if the user refreshs inside demo, the agenda will be empty. Agenda in my case is always "goguman"
		}
	}, [store.agendas.length, actions]);

	//logic to handle detele and update and tell the single component how to react in the view
	const handleDelete = (contactId) => {
		if (store.agenda.slug) {
			actions.deleteContact(store.agenda.slug, contactId);
		} else {
			console.error('No agenda available to delete the contact');
		}
	};

	const handleUpdate = (updatedContact) => {
		if (store.agenda.slug) {
			actions.updateContact(store.agenda.slug, updatedContact.id, updatedContact);
		} else {
			console.error('No agenda available to update the contact');
		}
	};

	return (
		<div className="container mt-5">
			<h1 className="mb-4">Contacts</h1>
			{Array.isArray(store.contacts) && (
				<div>
					{store.contacts.map((contact) => (
						<div className="row mb-3" key={contact.id}>
							<div className="col">
								<ContactCard contact={contact} onDelete={handleDelete} onUpdate={handleUpdate} /> 
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default Demo;