import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import fetch from "node-fetch";

@Injectable()
export class BooksService {
  create(createBookDto: CreateBookDto) {
    return 'This action adds a new book';
  }

  findAll(type: string, currentPage: number) {
    console.log("Find all for type: ", type);
    var url = `https://openlibrary.org/search.json?q=${type}`
    console.log(url)
    return fetch(url)
      .then(r => r.json())
      .then(books => {
        var bookKeys = []
        let bookDocs = books.docs
        bookDocs.forEach(element => {
          bookKeys.push(...element.edition_key)
        });
        return bookKeys
      })
      .then(bookIds => {
        var ids = ""
        var numberElementsOnPage = 10
        bookIds = bookIds.slice(currentPage*numberElementsOnPage, (currentPage+1)*numberElementsOnPage)
        ids = bookIds.join(",")
        var url = `https://openlibrary.org/api/books?bibkeys=OLID:${ids}&jscmd=data&format=json`
        console.log(url)
        return url
      }).then(url=>
        fetch(url)
          .then(r => r.json())
          .then(book=>{
            // create book entity
            return book;
          })
      ); //`This action returns all books`; //https://openlibrary.org/search.json?q=math
  }

  findOne(id: string) {
    console.log("finding book with id: ", id)
    var url = `https://openlibrary.org/api/books?bibkeys=OLID:${id}&jscmd=data&format=json`
    return fetch(url)
      .then(r => r.json())
      .then(book=>{
        // create book entity
        return book;
      })    // https://openlibrary.org/api/books?bibkeys=OLID:OL22853304M&jscmd=data&format=json
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    return `This action updates a #${id} book`;
  }

  remove(id: number) {
    return `This action removes a #${id} book`;
  }
}
