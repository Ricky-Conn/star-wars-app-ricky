import React, {CSSProperties, Component, useEffect} from 'react';
import { connect } from 'react-redux';
import { setPeople } from '../redux/peopleSlice';
import store from '../redux/store'

var url:string = 'http://localhost:4000/graphql?query=%7Bpeople%28pageNum%3A'+store.getState().page.value+'%29%7Bname%7D%7D%0A'
var i:number = 0;
var people = [{name:null}]
var defaultHeight = "5.7vh"
var hoverHeight = "7vh"
var page = 0

const fetchPeople = async () => {
  const peopleBefore = people
  url = 'http://localhost:4000/graphql?query=%7Bpeople%28pageNum%3A'+store.getState().page.value+'%29%7Bname%7D%7D%0A'
  const data = await fetch(url)
  const returnedData = await data.json()
  people = returnedData.data.people
  if(JSON.stringify(people) !== JSON.stringify(peopleBefore))
  {
    store.dispatch(setPeople(people))
    var summaryContainer = document.getElementById('summary-container')
    if(summaryContainer)
    {
      summaryContainer.style.textAlign = "-webkit-center"
      summaryContainer.style.color = "white"
      if(summaryContainer.style.height === "")
        summaryContainer.style.height = (summaryContainer.offsetHeight*1.02)+"px"
    }
  }
  
}

fetchPeople()

function setSummary(el)
{
  el.style.margin = "3px"
  el.style.borderRadius = "0"
  el.style.width = "100%"
  el.style.height = defaultHeight
  el.style.paddingTop = "10px"
  el.style.background = "linear-gradient(to right, rgb(166, 161, 183), rgb(160, 117, 255)) 0% 0%"
  el.style.opacity = "1"
}

class Page extends Component{
  mouseEnterStyles=event=>{
    event.target.style.height = hoverHeight
    event.target.style.boxShadow = "0px 0px 4px 2px rgba(255,255,255,0.49) inset"
  }

  mouseLeaveStyles=event=>{
    event.target.style.height = defaultHeight
    event.target.style.boxShadow = null
  }

  clicked=event=>{
    console.log(event)
  }

  componentDidUpdate=event=>
  {
    fetchPeople()
    var summaries = document.getElementsByClassName('summary-card')
    Array.from(summaries as HTMLCollectionOf<HTMLElement>).forEach(el => {
      setSummary(el)
    })
  }

  render ()
  {
    return(
      <div id="summary-container">
        {
            store.getState().people.value.map(person => {
              i++;
              return <div 
                        className="summary-card" 
                        onMouseEnter={this.mouseEnterStyles.bind(this)} 
                        onMouseLeave={this.mouseLeaveStyles.bind(this)}
                        onClick={this.clicked.bind(this)}
                        key={i}>
                          {person.name}
                      </div>
            })
        }
      </div>
    )
  }

  constructor(props) {
    super(props);
  }
    
  state = { people: [{name:"fred"}],
            page: 0}
}

function mapStateToProps(state) {
  return { 
            people: state.people.value,
            page: state.page.value 
          };
} 

export default connect(mapStateToProps)(Page);
