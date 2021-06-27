import React, { Component } from 'react';
import { connect } from 'react-redux'
import { RouteComponentProps, useParams } from 'react-router';
import { createLogicalOr } from 'typescript';
import { setPerson } from '../redux/selectedPersonSlice';
import store from '../redux/store';

var url:string = 'http://localhost:4000/graphql?query=%7Bpeople%28pageNum%3A'+store.getState().selectedPerson.value+'%29%7Bname%7D%7D%0A'
var person:person = {
                        name:"",
                        mass:"",
                        height:"",
                        gender:"",
                        homeworld:""}

const fetchPerson = async () => {
  const personBefore = person
  url = 'http://localhost:4000/graphql?query=%7Bsearch%28name%3A%22'+store.getState().selectedPerson.value+'%22%29%7Bname%2Cheight%2Cmass%2Cgender%2Chomeworld%7D%7D%0A'
  const data = await fetch(url)
  const returnedData = await data.json()
  person = returnedData.data.search[0]
  // if(JSON.stringify(person) !== JSON.stringify(personBefore))
  // {
    const characterDetails = document.getElementById("character-details")
    if(characterDetails)
    {
      characterDetails.style.background = "linear-gradient(to right, rgb(166, 161, 183), rgb(160, 117, 255)) 0% 0%"
      characterDetails.style.borderRadius = "4px"
      characterDetails.style.paddingTop = "7vh"
      characterDetails.style.paddingBottom = "7vh"
    }
    const characterDetailsText = document.getElementsByClassName("character-detail")
    if(person && characterDetailsText[0])
    {
      characterDetailsText[0].innerHTML = "Name: "+person.name
      characterDetailsText[1].innerHTML = "Mass: "+person.mass
      characterDetailsText[2].innerHTML = "Height: "+person.height
      characterDetailsText[3].innerHTML = "Gender: "+person.gender
      characterDetailsText[4].innerHTML = "Homeworld: "+person.homeworld
    }
    Array.from(characterDetailsText as HTMLCollectionOf<HTMLElement>).forEach(element => {
      element.style.paddingTop = "4vh"
      element.style.paddingBottom = "4vh"
      element.style.fontWeight = "bold"
      element.style.textAlign = "left";
      element.style.paddingLeft = "25vw";
    });
  // }
}

fetchPerson()

interface IMyProps {}
interface IReactRouterParams {
  personName: string;
}
interface person{
  name: string,
  height: string,
  mass: string,
  gender: string,
  homeworld: string,
}

class CharacterDetails extends Component<IMyProps & RouteComponentProps<IReactRouterParams>> {

  static getDerivedStateFromProps(nextProps, prevState){
   if(nextProps?.selectedPerson !== prevState?.selectedPerson){
      fetchPerson()
      return { selectedPerson: nextProps.selectedPerson};
   } 
   else {
      return null;
   }
 }
 
 componentDidUpdate(prevProps, prevState) {
   if(prevProps.selectedPerson !== store.getState().selectedPerson){
    if(store.getState().selectedPerson.value !== this.props.match.params.personName)
      store.dispatch(setPerson(this.props.match.params.personName))
      fetchPerson()
      const characterContainer = document.getElementById('character-container')
      if(characterContainer)
        characterContainer.style.color = "white"
    }
 }

 state = { people: [{name:""}],
           page: 0,
           selectedPerson:""}

  render ()
  {
    return(
      <div id="character-container">
        <h1>Character Details</h1>
        <div id="character-details">
          <div className="character-detail"></div>
          <div className="character-detail"></div>
          <div className="character-detail"></div>
          <div className="character-detail"></div>
          <div className="character-detail"></div>
        </div>
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
