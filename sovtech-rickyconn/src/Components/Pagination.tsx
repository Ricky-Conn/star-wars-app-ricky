import React, {CSSProperties, Component} from 'react';
import { connect } from 'react-redux';
import { setPage } from '../redux/pageSlice';
import store from '../redux/store'
import { Link } from 'react-router-dom'

var pages: string[] = []
const numPages: number = 9
var i:number = 0;

function addPages(numPages:number)
{
  for(var i:number = 0; i < numPages; i++)
  {
    pages.push('')
  }
}

addPages(numPages)

function selected(element)
{
  element.style.background = "white"
  element.style.color = "black"
  element.style.fontWeight = "bold"
}

class Pagination extends Component{

  clicked=event=>{
    if(store.getState().page.value !== parseFloat(event.target.innerText))
    {
      store.dispatch(setPage(parseFloat(event.target.innerText)))
      const pageSelectors = document.getElementsByClassName("page-selector")
      Array.from(pageSelectors as HTMLCollectionOf<HTMLElement>).map(element => {
        element.style.background = "rgb(160, 117, 255)";
        element.style.color = "white";
        element.style.fontWeight = "";
      });
      selected(event.target)
    }
  }

  render ()
  {
    return(
      <div id="pageContainer">
        {
          pages.map(page =>
            {
              i++;
              if(i>numPages)
              {
                i = 1
              }
              return <Link to={`${i}`}>
                        <div className="page-selector" key={i} onClick={this.clicked.bind(this)}>{i}</div>
                      </Link>
            })
        }
      </div>
    )
  }

  constructor(props) {
    super(props);
  }
    
  componentDidMount = () => {
    const pageContainer = document.getElementById("pageContainer")
    if(pageContainer && pageContainer.style.height === "")
    {
      pageContainer.style.height = "5vh"
      pageContainer.style.display = "flex"
      pageContainer.style.justifyContent = "center"
    }

    const pages = document.getElementsByClassName("page-selector")
    
    Array.from(pages as HTMLCollectionOf<HTMLElement>).forEach(page => {
      page.style.background = "rgb(160, 117, 255)"
      page.style.height = "100%"
      page.style.width = "3vw"
      page.style.margin = "1px"
      page.style.color = "white"
    });
    
    var page
    if(pageContainer && pageContainer.children)
    {
      page = pageContainer.children[store.getState().page.value-1].children[0]
    }
    selected(page)
  }

  state = { page: 0}
}

function mapStateToProps(state) {
  return { page: state.page.value };
} 

export default connect(mapStateToProps)(Pagination);
