import React, { Component } from 'react';
import { connect } from 'react-redux'
import { RouteComponentProps, useParams } from 'react-router';
import { setPerson } from '../redux/selectedPersonSlice';
import store from '../redux/store';

var url:string = 'http://localhost:4000/graphql?query=%7Bpeople%28pageNum%3A'+store.getState().selectedPerson.value+'%29%7Bname%7D%7D%0A'
var person = [{name:null}]

const fetchPerson = async () => {
  const personBefore = person
  url = 'http://localhost:4000/graphql?query=%7Bsearch%28name%3A%22'+store.getState().selectedPerson.value+'%22%29%7Bname%2Cheight%2Cmass%2Cgender%2Chomeworld%7D%7D%0A'
  console.log(url)
  const data = await fetch(url)
  const returnedData = await data.json()
  console.log(returnedData.data.search[0])
  person = returnedData.data.person
  // if(JSON.stringify(person) !== JSON.stringify(personBefore))
  // {
  //   store.dispatch(setPerson(person))
  //   var summaryContainer = document.getElementById('summary-container')
  //   if(summaryContainer)
  //   {
  //     summaryContainer.style.textAlign = "-webkit-center"
  //     summaryContainer.style.color = "white"
  //     if(summaryContainer.style.height === "")
  //       summaryContainer.style.height = (summaryContainer.offsetHeight*1.02)+"px"
  //   }
  // }
  
}

// fetchPerson()

interface IMyProps {}
interface IReactRouterParams {
  personName: string;
}

class CharacterDetails extends Component<IMyProps & RouteComponentProps<IReactRouterParams>> {

  componentDidUpdate=event=>
  {
    if(store.getState().selectedPerson.value !== this.props.match.params.personName)
      store.dispatch(setPerson(this.props.match.params.personName))
    fetchPerson()
    const characterContainer = document.getElementById('character-container')
    if(characterContainer)
      characterContainer.style.color = "white"
  }

  render ()
  {
    return(
      <div id="character-container">
        <h1>Character Details</h1>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { 
            people: state.people.value,
            page: state.page.value,
            selectedPerson: state.selectedPerson.value
          };
} 

export default connect(mapStateToProps)(CharacterDetails);
