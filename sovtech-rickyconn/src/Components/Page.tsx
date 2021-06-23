import React, {useState, useEffect} from 'react';
import * as vars from "./styles"


function Page() {

  const [people, setPeople] = useState<any[]>([])
  var i:number = 0;

  document.head.appendChild(
    document.createElement('style')
  ).textContent = vars.personSummary

  useEffect(() =>{
    fetchPeople();
  },[])

  const fetchPeople = async () => {
    const data = await fetch('http://localhost:4000/graphql?query=%7Bpeople%28pageNum%3A1%29%7Bname%7D%7D%0A')
    const returnedData = await data.json()
    setPeople(returnedData.data.people)
  }

  return (
    <div>
      {
        people.map(person => {
          i++;
          return <div className="person-summary" key={i}>{person.name}</div>
        })
      }
    </div>
  );
}

export default Page;
