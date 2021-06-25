import React, {CSSProperties, Component} from 'react';
import { connect } from 'react-redux';
import { setPage } from '../redux/pageSlice';
import store from '../redux/store'

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

class Pagination extends Component{
  mouseEnterStyles=event=>{
  }

  mouseLeaveStyles=event=>{
  }

  clicked=event=>{
    store.dispatch(setPage(parseFloat(event.target.innerText)))
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
              return <div className="page-selector" key={i} onClick={this.clicked.bind(this)}>{i}</div>
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
    console.log(pageContainer)
    if(pageContainer)
    {
      pageContainer.style.height = "5vh"
      pageContainer.style.display = "flex"
    }

    const pages = document.getElementsByClassName("page-selector")
    Array.from(pages as HTMLCollectionOf<HTMLElement>).forEach(page => {
      page.style.background = "blue"
      page.style.height = "100%"
      page.style.width = "3vw"
      page.style.margin = "1px"
      page.style.color = "white"
    });
  }

  state = { page: 0}
}

function mapStateToProps(state) {
  return { page: state.page.value };
} 

export default connect(mapStateToProps)(Pagination);
