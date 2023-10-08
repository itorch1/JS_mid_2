const contacts = document.getElementById('contacts');
const filter = document.getElementById('filter');

fetchAndRenderContacts();

function fetchAndRenderContacts() {
    fetch('https://randomuser.me/api?results=50')
        .then(res => res.json())
        .then(data => { 
            const users = data.results;
            users.sort( (a,b) => {
                return a.name.first.localeCompare(b.name.first);
            })
                .forEach( user => {
                const name = `${user.name.first} ${user.name.last}`;
                if (!contacts.querySelector('#'+name[0])) {
                    const section = document.createElement('div');
                    section.id = name[0];
                    section.innerHTML = `<h2>${name[0]}</h2><ul></ul>`
                    contacts.appendChild(section);
                }

                const contact = document.createElement('li');
                contact.innerText = name;
                contacts.querySelector('#'+name[0]).querySelector('ul').appendChild(contact);

            });
        });
}

filter.addEventListener('input', filterUsers);

function filterUsers(e) {
    const sections = contacts.querySelectorAll('div');
    sections.forEach( section => {
        const sectionContacts = section.querySelectorAll('li');
        sectionContacts.forEach( contact => {
            if (contact.innerText.toLowerCase().includes(e.target.value.toLowerCase()))
                contact.style.display = 'block';
            else
                contact.style.display = 'none';
        });
    });
}