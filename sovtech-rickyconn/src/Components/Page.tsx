import React, {CSSProperties, Component} from 'react';
import { connect } from 'react-redux';
import { setPeople } from '../redux/peopleSlice';
import store from '../redux/store'

var i:number = 0;
var styles:CSSProperties = {}
var people = [{name:null}]
var defaultHeight = "6.2vh"
var hoverHeight = "7vh"

const fetchPeople = async () => {
  const data = await fetch('http://localhost:4000/graphql?query=%7Bpeople%28pageNum%3A1%29%7Bname%7D%7D%0A')
  const returnedData = await data.json()
  people = returnedData.data.people
  store.dispatch(setPeople(people))
  var summaries = document.getElementsByClassName('summary-card')
  Array.from(summaries as HTMLCollectionOf<HTMLElement>).forEach(el => {
    setSummary(el)
  })
}

fetchPeople()

function setSummary(el)
{
  el.style.margin = "0.5vh"
  el.style.borderRadius = "0"
  el.style.width = "100%"
  el.style.height = defaultHeight
  el.style.paddingTop = "10px"
  el.style.textAlign = "-webkit-center"
  el.style.color = "white"
  el.style.verticalAlign = "middle"
  el.style.background = "linear-gradient(to right, #000000, rgb(160 117 255))"
  el.style.backgroundRepeat = "no-repeat"
  el.style.backgroundSize = "cover"
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

  render ()
  {
    return(
      <div className="container">
        {
            store.getState().people.value.map(person => {
              i++;
              return <div 
                        style={styles} 
                        className="summary-card" 
                        onMouseEnter={this.mouseEnterStyles.bind(this)} 
                        onMouseLeave={this.mouseLeaveStyles.bind(this)}
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
    
  state = { people: [{name:"fred"}]}
}

function mapStateToProps(state) {
  return { people: state.people.value };
} 

export default connect(mapStateToProps)(Page);
