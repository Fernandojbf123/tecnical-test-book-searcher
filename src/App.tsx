import { useEffect, useState } from "react"
import BookCard from "./components/BookCard"
import SearchBar from "./components/SearchBar"

function App(): JSX.Element {

  let [books,setBooks] = useState(JSON.parse(localStorage.getItem("books")) ?? []);
  let [genres,setGenres] = useState([]);
  let [selectedGenre, setSelectedGenre] = useState("");
  let [filteredBooks, setFilteredBooks] = useState([]);


  const RequestBooksFromDB = async () => {
   const url="http://localhost:3000/library" 
   try {
    const response = await fetch(url);
    const result = await response.json();
    await setBooks(result)
   } catch (error) {
    console.log(error)
   }
  }

  useEffect ( () => {
    //search data if it exist or request it from DB
    if (Object.keys(books).length === 0) {
      console.log("buscando datos")
      RequestBooksFromDB()
    }
    //search the genres of the books
    let tmpGenre = books.map( book => {
      return book['book']['genre']
    })
    setGenres(Array.from(new Set(tmpGenre)))
  },[])

  useEffect ( () => {
    if (Object.keys(books).length>0) {
      localStorage.setItem("books",JSON.stringify(books))
    }
  },[books]) 

  useEffect ( ( ) => {
    filterBooks(selectedGenre)
  },[selectedGenre])

  const filterBooks = (selectedGenre: string) => {

    console.log("ejecu")
     let tmpFilteredBooks = [];
      
     if (selectedGenre === "") {
      tmpFilteredBooks = [...books]
      console.log(tmpFilteredBooks)
      setFilteredBooks(tmpFilteredBooks)
      return
    }

    for (let i=0; i<books.length; i++) {
      if (books[i]['book']['genre'] === selectedGenre) {
        tmpFilteredBooks.push(books[i])
      }
    }
    setFilteredBooks([...tmpFilteredBooks])
  }

  return (
<>
      <div className="w-full bg-slate-400">

        <div className="container min-h-screen p-10 mx-auto flex flex-col items-center">  
          <section className="h-1/5 flex flex-col mx-auto">

          <SearchBar 
            />

          <select onChange={e => setSelectedGenre(e.target.value)}>
          <option value={""}>-</option>
            {Object.keys(genres).length>0 ?
                genres.map( genre => 
                <option key={genre} value={genre}>{genre}</option>)
            : null }
          </select>

          </section>
            
          <section className="mt-10 flex flex-grow justify-center">
            {Object.keys(filteredBooks).length>0 ? 
              <ul className="flex flex-row flex-wrap gap-5">
              {filteredBooks.map(book => (
                <li key={book['book']['title']}>
                  <BookCard 
                  book={book}/>
                </li>
              ))}
              </ul>
            : 
              <h2>LOADING</h2>
            }

          </section>

          
      
      </div>


      </div>
    </>
  )
}

export default App
