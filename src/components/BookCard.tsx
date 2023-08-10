
type Props = {
    book: any,
}


const BookCard = ({book}: Props): JSX.Element => {

    
    //const {author, year, title, cover, synapsis} = book.book;
    const {title, cover} = book.book;

    return (
        <>
       <figure className="md:w-[250px] h-[200px] shadow-md bg-slate-200 rounded-md">
        <img className="bg-blue-200 p-5 w-full h-full" src={cover} alt={title} />
        <figcaption>{title}</figcaption>
       </figure>
        </>
    )
}

export default BookCard
