import React, {useState, useEffect} from 'react';

function Page() {

  const [people, setPeople] = useState<any[]>([])
  var i:number = 0;
  
  const color = 'red'

  const div = `
    .person-summary{
        color: ${color}
    }
  `

  document.head.appendChild(
    document.createElement('style')
  ).textContent = div

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
