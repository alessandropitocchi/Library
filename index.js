class Book{
    constructor(title, author, pages, isRead){
        this.title = title
        this.author = author
        this.pages = pages
        this.isRead = isRead
    }
}

class Library{
    constructor(){
        this.books = []
    }

    addBook(newBook){
        this.books.push(newBook)
    }

    getBook(title){
        return this.books.find((book) => book.title === title)
    }

    removeBook(title){
        this.books = this.books.filter((book) => book.title !== title)
    }

    isInLibrary(title){
        return this.books.some((book) => book.title === title)
    }
}

const library = new Library()

const addBookBtn = document.querySelector('.addBookBtn');
const addBookModal = document.querySelector('.addBookModal')
const closeModalBtn = document.querySelector('.closeModalBtn')
const formModal = document.querySelector('.formModal')
const formButton = document.querySelector('.modalBtn')
const grid = document.querySelector('.grid')

function openModal(){
    formModal.reset()
    addBookModal.classList.remove('hidden')
    addBookModal.classList.add('visible')
}

function closeModal(){
    addBookModal.classList.remove('visible')
    addBookModal.classList.add('hidden')
}

function resetGrid(){
    grid.innerHTML = ''
}

function updateGrid(){
    resetGrid()
    for (let book of library.books){
        createCard(book)
    }
}


function createCard(book){
    const bookCard = document.createElement('div')
    const title = document.createElement('p')
    const author = document.createElement('p')
    const pages = document.createElement('p')
    const isReadBtn = document.createElement('button')
    const removeBtn = document.createElement('button')

    isReadBtn.onclick = toggleRead
    removeBtn.onclick = removeBook

    bookCard.classList.add('bookCard')
    removeBtn.classList.add('btn')

    title.textContent = `Title: "${book.title}"`
    author.textContent = `Author: "${book.author}"`
    pages.textContent = `Pages: ${book.pages}`
    removeBtn.textContent = 'Remove Book'

    if(book.isRead){
        isReadBtn.classList.add('read')
        isReadBtn.textContent = 'Read'
    }else{
        isReadBtn.classList.add('unread')
        isReadBtn.textContent = 'Not Read' 
    }
  
    bookCard.appendChild(title)
    bookCard.appendChild(author)
    bookCard.appendChild(pages)
    bookCard.appendChild(isReadBtn)
    bookCard.appendChild(removeBtn)
    grid.appendChild(bookCard)
}


function toggleRead(e){
    const title = e.target.parentNode.firstChild.innerHTML.replaceAll('Title: ', '').replaceAll('"','')
    const book = library.getBook(title)

    book.isRead = !book.isRead
    updateGrid()
}

function removeBook(e){
    const title = e.target.parentNode.firstChild.innerHTML.replaceAll('Title: ', '').replaceAll('"','')
    console.log(title)
    library.removeBook(title)
    updateGrid()
}

function getBook(){
    const title = document.getElementById('title').value
    const author = document.getElementById('author').value
    const pages = document.getElementById('pages').value
    const isRead = document.getElementById('isRead').checked

    return new Book(title, author, pages, isRead)
}

function addBook(e){
    e.preventDefault()
    const newBook = getBook()
    
    if(library.isInLibrary(newBook.title)){
        alert("this book is already in the library")
    }else{
        library.addBook(newBook)
        updateGrid()
        closeModal()
    }
}

addBookBtn.onclick = openModal
closeModalBtn.onclick = closeModal
formModal.onsubmit = addBook

