import axios from 'axios';
import { Component, createRef, useEffect, useRef } from 'react';
import Scrollbars from 'react-custom-scrollbars';
import CustomScrollbar from '../CustomScroll/CustomScroll';
const io = require('socket.io-client');
import styles from './LogBox.module.scss';


export default class LogBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logs: []
        };


    }

    async componentDidMount() {
        this.scrollToBottom();
        const logs = await (await axios.get('/api/log')).data.data.logs;
        this.setState({ logs: logs });

        this.socket = io();
        this.socket.on('FromAPI', data => {
            this.setState({
                logs: [...this.state.logs, data.log]
            });
            this.scrollToBottom();
        });
    };

    scrollToBottom = () => {
        if (this.refs.myScrollbar !== undefined)
            this.refs.myScrollbar.scrollToBottom();
    }

    componentDidUpdate = () => {
        this.scrollToBottom();
    }

    render() {
        this.scrollToBottom();
        console.log(this.state.logs);
        return (
            <div className={styles.LogBox}>
                <Scrollbars
                    autoHide
                    autoHideTimeout={1000}
                    autoHideDuration={200}
                    autoHeight={true}
                    autoHeightMax={'100%'}
                    autoHeightMin={'100%'}
                    thumbMinSize={30}
                    universal={true}
                    ref='myScrollbar'
                >
                    {this.state.logs.map((item, index) => LogLine(item, index))}
                </Scrollbars>

            </div>

        );
    }
}


function LogLine(log, index) {
    var date = new Date(log.time);
    return (<p key={index} >{'[LOG] (' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() + ' ' + date.getMilliseconds() + ') ' + log.message}</p>);
}