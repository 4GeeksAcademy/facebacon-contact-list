import React, { useState } from 'react';

const ContactCard = ({ contact, onDelete, onUpdate }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [editedContact, setEditedContact] = useState(contact);

	//how to handle the update and edit arrays as well as display the corrected state
	const handleEditChange = (e) => {
		const { name, value } = e.target;
		setEditedContact({
			...editedContact,
			[name]: value
		});
	};

	const handleUpdate = () => {
		onUpdate(editedContact);
		setIsEditing(false);
	};

	return (
		<div className="card mb-3">
			<div className="card-body">
				{isEditing ? (
					<div>
						<div className="mb-3">
							<label className="form-label">Name</label>
							<input type="text" className="form-control" name="name" value={editedContact.name} onChange={handleEditChange} />
						</div>
						<div className="mb-3">
							<label className="form-label">Email</label>
							<input type="email" className="form-control" name="email" value={editedContact.email} onChange={handleEditChange} />
						</div>
						<div className="mb-3">
							<label className="form-label">Phone</label>
							<input type="text" className="form-control" name="phone" value={editedContact.phone} onChange={handleEditChange} />
						</div>
						<div className="mb-3">
							<label className="form-label">Address</label>
							<input type="text" className="form-control" name="address" value={editedContact.address} onChange={handleEditChange} />
						</div>
						<button className="btn btn-primary me-2" onClick={handleUpdate}>Save</button>
						<button className="btn btn-secondary" onClick={() => setIsEditing(false)}>Cancel</button>
					</div>
				) : (
					<div>
						<h5 className="card-title">{contact.name}</h5>
						<p className="card-text">Email: {contact.email}</p>
						<p className="card-text">Phone: {contact.phone}</p>
						<p className="card-text">Address: {contact.address}</p>
						<button className="btn btn-secondary me-2" onClick={() => setIsEditing(true)}>Edit</button>
						<button className="btn btn-danger" onClick={() => onDelete(contact.id)}>Delete</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default ContactCard;