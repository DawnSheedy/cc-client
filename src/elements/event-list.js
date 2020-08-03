import React, { Component } from 'react';
import { Col } from 'react-bootstrap'
import CaptionBox from './caption-box'
import CaptionListItem from './caption-list-item'

class EventList extends Component {
    constructor(props) {
        super(props)
        this.state = { captions: [] }
        this.handleCaptionEvent = this.handleCaptionEvent.bind(this)
    }

    //From stackoverflow
    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }

    componentDidMount() {
        this.props.socket.on('caption', this.handleCaptionEvent)
    }

    handleCaptionEvent(data) {
        //Ignore stuff not assigned to us
        if (!this.props.user.isAdmin) {
            if (!this.props.assignment) {
                return;
            }
            if (data.speaker.id !== this.props.assignment.id) {
                return;
            }
        }
        let newCaptions = [];
        let found = false;
        this.state.captions.forEach((value) => {
            if (value.id === data.id) {
                found = true;
                value = data;
            }
            if (value.status) {
                newCaptions.push(value);
            }
        })
        if (!found) {
            newCaptions.push(data);
        }
        this.setState({captions: newCaptions});
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    drawCaptionList() {
        return this.state.captions.map((caption) => <CaptionListItem key={caption.id} assignment={this.props.assignment} caption={caption} user={this.props.user} socket={this.props.socket} />)
    }

    render() {
        return(
            <Col style={{height: "100%"}} xs='12'>
                <div className="section-column">
                <div id="subtitleDiv" class="subtitle-div">
                    {this.drawCaptionList()}
                    <div style={{ float:"left", clear: "both" }}
                        ref={(el) => { this.messagesEnd = el; }}>
                    </div>
                </div>
                {!this.props.user.isAdmin && this.props.assignment ? <div style={{width: "100%", bottom:0, position: "absolute"}}><CaptionBox socket={this.props.socket} assignment={this.props.assignment} /></div> : <span></span>}
                </div>
            </Col>)
    }
}

export default EventList