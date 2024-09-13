const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			agendas: [],
			agenda: {},
			contacts: []
		},
		actions: {
//logic to get data from API past the init and to be able to update contacts and delete them after the original init agenda is done
			createContact: async (slug, contact) => {
				try {
					const response = await fetch(`https://playground.4geeks.com/contact/agendas/${slug}/contacts`, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify(contact)
					});
					await response.json();
					getActions().getAgendaContacts(slug);
				} catch (error) {
					console.error('API request failed:', error);
				}
			},
			updateContact: async (slug, contactId, contact) => {
				try {
					const response = await fetch(`https://playground.4geeks.com/contact/agendas/${slug}/contacts/${contactId}`, {
						method: 'PUT',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify(contact)
					});
					await response.json();
					getActions().getAgendaContacts(slug);
				} catch (error) {
					console.error('API request failed:', error);
				}
			},
			deleteContact: async (slug, contactId) => {
				try {
					const response = await fetch(`https://playground.4geeks.com/contact/agendas/${slug}/contacts/${contactId}`, {
						method: 'DELETE'
					});
					if (response.ok) {
						getActions().getAgendaContacts(slug);
					} else {
						console.error(`Failed to delete contact: ${response.statusText}`);
					}
				} catch (error) {
					console.error('API request failed:', error);
				}
			},
			getAgendaContacts: async (slug) => {
				if (slug.startsWith('goguman')) {  // Ensure we only fetch contacts for the "goguman" agenda
					try {
						const response = await fetch(`https://playground.4geeks.com/contact/agendas/${slug}/contacts`);
						const data = await response.json();
						setStore({ contacts: data.contacts });
					} catch (error) {
						console.error('API request failed:', error);
					}
				}
			},
			//initailize agenda and append goguman to the agenda endpoint and get it IF it exists otherwise create it
			initAgenda: async () => {
				const store = getStore();
				try {
					const response = await fetch('https://playground.4geeks.com/contact/agendas');
					const data = await response.json();
					console.log('Agenda data:', data);

					if (data && Array.isArray(data.agendas)) {
						const agendas = data.agendas;
						setStore({ agendas });

						const gogumanAgenda = agendas.find(agenda => agenda.slug.startsWith('goguman'));

						if (gogumanAgenda) {
							setStore({ agenda: gogumanAgenda });
							getActions().getAgendaContacts(gogumanAgenda.slug);
						} else {
							const newAgendaResponse = await fetch('https://playground.4geeks.com/contact/agendas', {
								method: 'POST',
								headers: {
									'Content-Type': 'application/json'
								},
								body: JSON.stringify({ slug: 'goguman' })
							});
							const newAgenda = await newAgendaResponse.json();
							setStore({ agenda: newAgenda });
							getActions().getAgendaContacts(newAgenda.slug);
						}
					} else {
						console.error('Unexpected response data format:', data);
					}
				} catch (error) {
					console.error('API request failed:', error);
				}
			},
//if the user refreshes and it needs an agenda it shuold prompt the user to enter the agenda slug in this case always goguman
			getUserAgenda: async () => {
				const store = getStore();
				try {
					const response = await fetch('https://playground.4geeks.com/contact/agendas');
					const data = await response.json();
					console.log('Agenda data:', data);

					if (data && Array.isArray(data.agendas)) {
						const agendas = data.agendas;
						setStore({ agendas });

						const userAgenda = prompt('Please enter your agenda slug:');
						const matchingAgenda = agendas.find(agenda => agenda.slug === userAgenda);

						if (matchingAgenda) {
							setStore({ agenda: matchingAgenda });
							getActions().getAgendaContacts(matchingAgenda.slug);
						} else {
							console.error('No matching agenda found');
						}
					} else {
						console.error('Unexpected response data format:', data);
					}
				} catch (error) {
					console.error('API request failed:', error);
				}
			}
		}
	};
};

export default getState;