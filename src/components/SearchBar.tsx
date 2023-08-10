
const SearchBar = (): JSX.Element => {

    const searchHandler = (e:any) => {
        e.preventDefault()
        console.log("BUSCANDO")
    }

  return (

      <form
          onSubmit={e => searchHandler(e)}
          className="w.full my-10 flex flex-row justify-center items-center gap-x-5"
      >
          <div>
              <input
                  id="bookName"
                  type="text"
                  className="p-2"
                  placeholder="Book's name"
              />

          </div>

          <div>
              <input type="submit"
                  className="bg-gray-600 p-2 rounded-md cursor-pointer hover:bg-gray-800 text-white font-bold"
                  value="Search" />
          </div>




      </form>
  )
}

export default SearchBar
