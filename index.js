const express = require('express')
const app = express();
const port = 3000

app.use(express.json())
app.listen(port,()=>{
    console.log(`Server is running on https://localhost:${port}`)
})

const books = [
    {id:1, title:'Node.js'},
    {id:2, title:'Api Fundamentals'}
]

app.get('/books',(req,res)=>{
    res.json(books)
})
app.get('/books/:id',(req,res)=>{
    const bookId = parseInt(req.params.id)
    let book = null
    
    for(let i = 0; i < books.length; i++) {
        if(books[i].id === bookId) {
          book = books[i]
            break
        }
    }

    if(book === null) {
        res.json({message:'Book not Found'})
    }
    else {
        res.json(book)
    }
})

app.post('/books',(req,res)=>{
    const newBook = req.body
    newBook.id = books.length + 1;
    books.push(newBook)

    res.json(newBook)
})

app.put('/books/:id',(req,res)=>{
    const bookId = parseInt(req.params.id)
    const newTitle = req.body
    let bookFound = false

    for(let i = 0; i < books.length; i++) {
        if(books[i].id=== bookId) {
            books[i].title = newTitle.title
            bookFound = true
        }
    }
    if(bookFound === false) {
        res.json({message:'Book was not updated'})
    }
    else {
        res.json({message:'Book was updated'})
    }
})
app.delete('/books/:id', (req,res)=>{
    const bookId = parseInt(req.params.id)
    let bookFound = false

    for (let i = 0; i < books.length; i++) {
        if(books[i].id === bookId) {
            books.splice(i,1)
            bookFound = true
        }
    }

    if(bookFound === false) {
        res.json({message:'Book was not deleted'})
    }
    else {
        res.json({message:'Book was deleted'})
    }
})