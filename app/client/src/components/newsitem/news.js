import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import _ from "lodash";

import { Row, Col, Card } from 'antd';
import './news.css';
import 'antd/dist/antd.css';
import * as  newsActions from '../../actions/newsAction';

class News extends Component{
    componentDidMount(){
        this.props.actions.getNewByID(this.props.match.params.new_id)
    }
    render(){
        const { newbyid } = this.props;
        return(
            <div>
              <div>
              {newbyid.title}
              </div>
              <div>
              {newbyid.content}
              </div>
            </div>
        )
    }
}
const mapDispatchToProps = dispath => {
    return {
      actions: bindActionCreators({
        getNewByID: newsActions.getNewByID
      },
        dispath)
    }
  }
  
  const mapStateToProps = state => ({
    newbyid: _.get(state, ["newsReducer", "newbyid"])
  });
// function News({match}) {

//         return (
//             <div>
//                 <Row>
//                     <div>
//                         {match.params.new_id}
//                         {/* {views} */}
//                     </div>
//                 </Row>
//             </div>
//         )
    
// }
//export default connect(null, null)(News);
// export default News;
export default connect(mapStateToProps, mapDispatchToProps)(News);