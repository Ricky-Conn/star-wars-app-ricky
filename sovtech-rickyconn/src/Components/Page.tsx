import React, {useState, useEffect, CSSProperties} from 'react';


function Page() {

  const [people, setPeople] = useState<any[]>([])
  var i:number = 0;
  var styles:CSSProperties = {}

  useEffect(() =>{
    fetchPeople();
  },[])

  const fetchPeople = async () => {
    const data = await fetch('http://localhost:4000/graphql?query=%7Bpeople%28pageNum%3A1%29%7Bname%7D%7D%0A')
    const returnedData = await data.json()
    setPeople(returnedData.data.people)
    var summaries = document.getElementsByClassName('summary-card')
    Array.from(summaries as HTMLCollectionOf<HTMLElement>).forEach(el => {
      setSummary(el)
      setTimeout(function()
      {
        el.style.opacity = "1"
      }, 5000);
    })
  }

  function setSummary(el)
  {
    el.style.margin = "0.5vh"
    el.style.borderRadius = "0"
    el.style.width = "100%"
    el.style.height = "6.2vh"
    el.style.paddingTop = "10px"
    el.style.textAlign = "-webkit-center"
    el.style.color = "white"
    el.style.verticalAlign = "middle"
    el.style.background = "linear-gradient(to right, #000000, rgb(160 117 255))"
    el.style.backgroundRepeat = "no-repeat"
    el.style.backgroundSize = "cover"
  }

  return (
    <div className="container">
      {
        people.map(person => {
          i++;
          return <div style={styles} className="summary-card" key={i}>{person.name}</div>
        })
      }
    </div>
  );
}

export default Page;
