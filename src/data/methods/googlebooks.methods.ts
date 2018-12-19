import { Book } from "data/models"

export class GoogleBooksMethods {
    public async findBookByISBN13(isbn13: string): Promise<Book|null>{
        //"9781451648546" Steve Jobs book

        var url = "https://www.googleapis.com/books/v1/volumes?q=isbn:" + isbn13;

        var response = await window.fetch(url);
        var results = await response.json();
        
        if(results.totalItems){
            var rawBook = results.items[0];
            console.log('Raw Google book result', rawBook);
            let parsedBook = this.parseGoogleBookIntoBook(rawBook, isbn13);
            console.log('Parsed book result', parsedBook);
        }

        return null;
    }

    private parseGoogleBookIntoBook(googleBook: any, isbn13: string): Book | null{
        let parsedBook = new Book();
        parsedBook.isbn13 = isbn13;
        parsedBook.Title = googleBook["volumeInfo"]["title"];
        parsedBook.Subtitle = googleBook["volumeInfo"]["subtitle"];
        parsedBook.Authors = googleBook["volumeInfo"]["authors"];
        parsedBook.Publisher = googleBook["volumeInfo"]["publisher"];
        parsedBook.PublishedDate = googleBook["volumeInfo"]["publishedDate"];
        parsedBook.PageCount = googleBook["volumeInfo"]["pageCount"];
        parsedBook.ThumbnailURL = googleBook["volumeInfo"]["imageLinks"]["thumbnail"];
        parsedBook.Description = googleBook["volumeInfo"]["description"];

        return parsedBook;
    }

}