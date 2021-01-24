import axios from 'axios';
import { Component } from 'react';
import Scrollbars from 'react-custom-scrollbars';
import styles from './LogBox.module.scss';
import Pusher from 'pusher-js';

export default class LogBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logs: []
        };
    }

    async componentDidMount() {
        const logs = (await (await axios.get('/api/log')).data.data.logs);
        this.setState({ logs: logs });

        this.pusher = new Pusher(process.env.PUSHER_KEY, {
            cluster: 'eu'
        });

        var channel = this.pusher.subscribe('my-channel');
        
        var ref = this;
        channel.bind('my-event', function (data) {
            ref.setState({
                logs: [...ref.state.logs, data.log]
            })
        });
    };

    componentWillUnmount() {
        this.pusher.disconnect();
    }

    scrollToBottom = () => {
        if (this.refs.myScrollbar != undefined)
            this.refs.myScrollbar.scrollToBottom();
    }

    componentDidUpdate = () => {
        this.scrollToBottom();
    }

    render() {
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