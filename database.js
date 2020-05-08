let people = [
    { id: "1", name: "Jane Doe", bio: "Not Tarzan's Wife, another Jane" },
	{ id: "2", name: "Joe Blow", bio: "That random guy from down the street" },
	{ id: "3", name: "Just Karen", bio: "No one likes Karen, for multiple reasons" }, 
]

function getPeople() {
    return people
}

function getPersonByID(id) {
    return people.find(p => p.id === id)
}

function createPerson(data) {
    const payload = {
        id: String(people.length + 1),
        ...data,
    }
    people.push(payload)
    return payload
}

function updatePerson(id, data) {
    const index = people.findIndex(p => p.id === id)
    people[index] = {
        ...people[index],
        ...data,
    }
    return people[index]
}

function deletePerson(id) {
    people = people.filter(p => p.id != id)
}

module.exports = {
    getPeople,
    getPersonByID,
    createPerson,
    updatePerson,
    deletePerson,
}