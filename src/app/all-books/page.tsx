"use client";

import React, { useEffect, useReducer, useState } from 'react'
import axios from 'axios';
import { useToast } from '@/components/ui/use-toast';
import { Booktype } from '@/model/Books.model';
export function AllBooksPage() {
  const {toast} = useToast();
  
  const [books,setBooks] = useState<Booktype[]>([]);
  const [loading , setLoading] = useState(false)
  
  useEffect(()=>{
         getBooksData();

  },[])

  const getBooksData = async()=>{
    setLoading(true)
    try {
      let getbooks = await axios.put('/api/get-all-books');
      // console.log(getbooks.data.findbooks);
      setBooks(getbooks.data.data);
      toast({
        title:'Books fetched successfully'
      })
      
    } catch (error:any) {
      console.log(error);
      toast({
        title:"Error occured while getting books data "
      })
    }
    setLoading(false)
  }

  return (
    <div>

      
       {
        loading?
        (<div>Loading...</div>):
        books.length>0 ? (<div>
          {
            books.map((book,i)=>(
              <div key={i}>{book.title}</div>
            ))
          }
        </div>) : (<div>No books available</div>)
       }
    </div>
  )
}

export default AllBooksPage