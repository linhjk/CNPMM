import React from 'react';
import {Col, Row, Table, Popconfirm, Icon, message, Tag, Form, Menu, Dropdown, Spin} from 'antd';
import { Input, Select } from 'antd';
import axios from 'axios';
import ManageNewDetails from './ManageNewsDetail';


const columns = [
    {
        title: 'Tên bài đăng',
        dataIndex: 'title',
        key: 'title',
    },
    {
        title: 'Nội dung',
        dataIndex: 'content',
        key: 'content',
    },
    {
        title: 'Hình ảnh',
        dataIndex: 'image',
        key: 'image',
    },
];

const { Search } = Input;
const { Option } = Select;



class ManageNews extends React.Component {
    constructor(props){
        super();
        this.state ={
            selectedRowKeys: [],
            loading:false,
            pagination: {},
            newDisplay : [],
           
           // baseUrl: ENV.url,
            spinLoading:false,
            visible:false,
            record:null,
            selectedNew:null,
        }
    };

    componentDidMount() {
        this.fetch();
    }
    onSelectChange = selectedRowKeys => {
        this.setState({ selectedRowKeys });
    };

    handleTableChange = (pagination) => {
        const pager = { ...this.state.pagination };
        pager.current = pagination.current ;
        this.setState({
            pagination: pager,
        });
        this.fetch({
            page: pagination.current - 1,
            size: pagination.pageSize,
            status: this.status
        });
    };
    
     handleClose = (isRefetch = false) => {
        this.setState({
            visible: false,
            selectedRowKeys: []
        });

        if (isRefetch === true) {
            this.fetch();
            //this.triggerChangeFacility(this.state.selectedFacility.id);
        }
    };
    fetch = ()=>{
        this.setState({spinLoading:true})
        axios
        .get('http://localhost:5000/news')
        .then(res =>{
            
            this.setState({newDisplay: [...res.data],spinLoading:false})
            console.log(this.state.newDisplay);
          }
        )
        .catch(err =>
            console.log(err)
        );
    
    }
    showModalAdd = () => {
        //if(this.state.classDisplay==null) {message.error("Vui lòng chọn bản tin cần thực hiện!")}
        //else {
            this.setState({
                visible: true,
                record: null
            });
        //}

    };
    showModalEdit() {
       // console.log(this.state.selectedNew);
        if (this.state.selectedRowKeys.length !== 1) {
            message.error("Chỉ có thể cập nhật một bản tin!");
            return;
        }
        this.setState({
            visible: true,
            record: this.state.selectedRowKeys[0]
        });
    }

    handleDeleteClick = () => {
        message.info("Handle Delete Click")
        // this.setState({loading: true});
        //
        // axios({baseURL: this.state.baseUrl})
        //     .put("/api/v1/faculty/deleteMany", {ids: this.state.selectedRowKeys})
        //     .then(res => {
        //         if (res.status === HttpStatus.OK) {
        //             message.success("Success !!!");
        //             this.fetch(this.params);
        //         }
        //     })
        //     .catch(err => {
        //         message.error("Error " + err);
        //     })
        //     .finally(() => this.setState({loading: false}))
    };


    onSelectChange = selectedRowKeys => {
     
        this.setState({ selectedRowKeys });
    };
    render() {
        const { selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        return(
            <div>
                <Spin spinning={this.state.spinLoading}>
                
                <Row>
                    <button className="btn btn-sm btn-success" onClick={this.showModalAdd.bind(this)}>Thêm</button>
                    <button className="btn btn-sm btn-warning" onClick={this.showModalEdit.bind(this)}>Sửa</button>
                    <Popconfirm
                        title="Are you sure？"
                        icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
                        onConfirm={this.handleDeleteClick}
                    >
                        <button className="btn btn-sm btn-danger">Xóa</button>
                    </Popconfirm>
                </Row>
                <Row>
                    <Table
                        rowSelection={rowSelection}
                        rowKey={record => record}
                        dataSource={this.state.newDisplay} columns={columns}
                        size={"small"}
                        onChange={this.handleTableChange}
                    />
                </Row>
                </Spin>
                {this.state.visible === true ? <ManageNewDetails visible={this.state.visible} handleClose={this.handleClose} data={this.state.selectedNew} class={this.state.record} form={this.props.form}/>: null}
            </div>
        )
    }

}
export default Form.create()(ManageNews);