import React, { useState, useEffect } from 'react'

import API from "../API";

export default function List() {
  const [groceries, setGroceries] = useState([]);

  useEffect(() => {
    const getAndSetGroceries = async () => {
      const getGroceries = await API.getAllGroceries();
      setGroceries(getGroceries);
    }
    getAndSetGroceries();
    console.log(groceries);
  }, []);

  return (
    <div>

      
    </div>
  )
}
