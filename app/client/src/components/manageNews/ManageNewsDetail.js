import React from 'react';
import { Form, Col, Row, Modal, Input, message, Spin, DatePicker, Upload,Icon } from 'antd';
import axios from 'axios';

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }
  
  function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  }

export default class ManageNewsDetail extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            spinLoading: false,
            //baseUrl: ENV.url,
            visible: this.props.visible,
            confirmLoading: false,
            selectedFacility: this.props.data,
            class: this.props.class,
        };
    }
    handleChange = info => {
        if (info.file.status === 'uploading') {
          this.setState({ loading: true });
          return;
        }
        if (info.file.status === 'done') {
          // Get this url from response in real world.
          getBase64(info.file.originFileObj, imageUrl =>
            this.setState({
              imageUrl,
              loading: false,
            }),
          );
        }
      };

    componentDidMount() {
        console.log(this.state.class)
        if (this.state.class) {
            this.initFormValue();
        }

    }

    handleOk = (e) => {
        e.preventDefault();
        //if (this.state.class == null) {
           
            this.props.form.validateFields((err, values) => {
                if (!err) {
                    values.active =true;
                    values.image=null;
                    this.setState({
                        confirmLoading: true,
                        spinLoading: true,
                    });
                    console.log(values);
                    axios
                        .post("http://localhost:5000/news", values)
                        .then(res => {
                            message.success(res.message);
                        })
                        .catch(err => message.error("Fail !"))
                        .finally(() => {
                            this.setState({
                                confirmLoading: false,
                                spinLoading: false,
                                visible: false
                            });
                            this.props.handleClose(true);
                        })
                }
            });
        // }
        // else {
        //     this.props.form.validateFields((err, values) => {

        //         if (!err) {
        //             values.id = this.state.class.id;
        //             this.setState({
        //                 confirmLoading: true,
        //                 spinLoading: true,
        //             });
        //             axios({ baseURL: this.state.baseUrl })
        //                 .put("/api/v1/class/update", values)
        //                 .then(res => {
        //                     message.success("Success !");
        //                 })
        //                 .catch(err => message.error("Fail !"))
        //                 .finally(() => {
        //                     this.setState({
        //                         confirmLoading: false,
        //                         spinLoading: false,
        //                         visible: false
        //                     });
        //                     this.props.handleClose(true);
        //                 })
        //         }
        //     });
        // }

    }

    initFormValue = () => {
        this.props.form.setFieldsValue({
            title: this.state.class.title,
            content: this.state.class.content
        })
    }

    render() {
        const { visible, confirmLoading } = this.state;
        const { getFieldDecorator } = this.props.form;
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        const { imageUrl } = this.state;
        //message.info(this.state.selectedFacility);
        return (
            <div>
                <Modal
                    title={this.state.class != null ? "Chỉnh sửa bài đăng: " + this.state.class.title : "Thêm bài đăng mới"}
                    visible={visible}
                    maskClosable={false}
                    width={700}
                    onOk={this.handleOk}
                    confirmLoading={confirmLoading}
                    onCancel={this.props.handleClose}
                >
                    <Spin spinning={this.state.spinLoading}>

                        <Form onSubmit={this.handleOk}>
                            <Row>
                                <Col span={11}>
                                    <label>Tên bài đăng : </label>
                                    <Form.Item>
                                        {getFieldDecorator('title', {
                                            rules: [{ required: true, message: 'Tên bài đăng là bắt buộc!' }],
                                        })(
                                            <Input type="text" allowClear name="title" />
                                        )}

                                    </Form.Item>
                                </Col>
                                <Col span={2} />
                            </Row>
                            <Row>
                                <Col span={12}>
                                    <label>Nội dung : </label>
                                    <Form.Item>
                                        {getFieldDecorator('content', {
                                            rules: [{ required: true, message: 'Nội dung là bắt buộc!' }],
                                        })(
                                            <Input type="text" allowClear name="content" />
                                        )}
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Upload
                                    name="avatar"
                                    listType="picture-card"
                                    className="avatar-uploader"
                                    showUploadList={false}
                                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                    beforeUpload={beforeUpload}
                                    onChange={this.handleChange}
                                >
                                    {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                                </Upload>
                            </Row>

                        </Form>
                    </Spin>

                </Modal>
            </div>
        );
    }

}