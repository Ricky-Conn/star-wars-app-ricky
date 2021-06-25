import React, {CSSProperties, Component} from 'react';
import { connect } from 'react-redux';
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

  render ()
  {
    return(
      <div id="pageContainer">
        {
          pages.map(page =>
            {
              i++;
              return <div className="page-selector" key={i}></div>
            })
        }
      </div>
    )
  }

  constructor(props) {
    super(props);
  }
    
  state = { page: 0}
}

function mapStateToProps(state) {
  return { page: state.page.value };
} 

export default connect(mapStateToProps)(Pagination);
