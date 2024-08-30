import React, { useEffect, useReducer, useState } from 'react'
import axios from 'axios';
import { useToast } from '@/components/ui/use-toast';
type Book={
      title:string;
      genre:string;
      author:string;
}
export async function AllBooksPage() {
  const {toast} = useToast();
  const [books,setBooks] = useState<Book[]>([])
  let userId = "";
  useEffect(()=>{
    if(localStorage.getItem("userId")){
       userId = localStorage.getItem("userId") ?? "";
    }
    getData();
   
  })

  const getData = async()=>{
    try {
      const allBooks = await axios.put<{ data: Book[] }>('/get-all-books', JSON.parse(userId));
      setBooks(allBooks.data.data);
    
    } catch (error:any) {
         console.log(error.message);
         toast({
          title:"Can not get Books details, Try Again later"
         })
    }
  }


   
    



  return (
    <div>
       {
         books.map((book,i)=>(
          <div key={i}>
          {book?.title}
          </div>
        ))
       }
    </div>
  )
}

export default AllBooksPage