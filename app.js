const ul = document.querySelector('#cafe-list')
const form = document.querySelector('#add-cafe-form')


// создание элементов и отображение даты
function renderCafe (doc) {
    let li = document.createElement('li')
    let name = document.createElement('span')
    let city = document.createElement('span')
    let cross = document.createElement('div')

    li.setAttribute('data-id', doc.id)
    name.textContent = doc.data().name
    city.textContent = doc.data().city
    cross.textContent = 'x'

    li.appendChild(name)
    li.appendChild(city)
    li.appendChild(cross)
    
    ul.appendChild(li)


    // удаление даты
    cross.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id')
        db.collection('cafes').doc(id).delete()
    })
}
// получение даты
// db.collection('cafes').get().then((snapshot) => {
//     snapshot.docs.forEach(doc => {
//         renderCafe(doc)
//     })
// })

// real time получение даты
db.collection('cafes').orderBy('city').onSnapshot(snapshot =>{
    snapshot.docChanges().forEach(change => {
        if(change.type == 'added') {
            renderCafe(change.doc)
        } else if (change.type == 'removed') {
            let li = ul.querySelector('[data-id=' + change.doc.id + ']')
            ul.removeChild(li)
        }    
    })
})

// сохранение даты
form.addEventListener('submit', (e) => {
    db.collection('cafes').add({
        name:form.name.value,
        city:form.city.value
    })
    form.name.value = ''
    form.city.value = ''
    e.preventDefault()
})