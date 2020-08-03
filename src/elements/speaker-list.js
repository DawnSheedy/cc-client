import React, { Component } from 'react';
import SpeakerCreator from './speaker-creator';
import SpeakerListItem from './speaker-list-item'

class SpeakerList extends Component {

    constructor(props) {
        super(props)

        this.state = {
            speakers: []
        }

        this.handleSpeakerEvent = this.handleSpeakerEvent.bind(this);
        this.speakerCompare = this.speakerCompare.bind(this);
    }

    componentDidMount() {
        this.props.socket.on('speaker', this.handleSpeakerEvent);
    }

    handleSpeakerEvent(data) {
        console.log(data);
        let newSpeakers = [];
        let found = false;
        this.state.speakers.forEach((value) => {
            if (value.id === data.id) {
                found = true;
                value = data;
            }
            if (value.status) {
                newSpeakers.push(value);
            }
        })
        if (!found) {
            newSpeakers.push(data);
        }
        newSpeakers.sort(this.speakerCompare);
        console.log(JSON.stringify(newSpeakers))
        this.setState({ speakers: newSpeakers });
    }

    speakerCompare(a, b) {
        if (a.writer && !b.writer) return -1;
        if (b.writer && !a.writer) return 1;
        return 0;
    }

    getHeader() {
        if (this.props.user.isAdmin) {
            return (<SpeakerCreator socket={this.props.socket} />);
        }
        return (<span></span>)
    }

    drawSpeakerList() {
        return this.state.speakers.map((speaker) => <SpeakerListItem key={speaker.id} assignment={this.props.assignment} speaker={speaker} user={this.props.user} socket={this.props.socket} />)
    }

    render() {
        return (<div>
            <h5 className="transition-container">Welcome, {this.props.user.name}</h5>
            {this.getHeader()}
            {this.drawSpeakerList()}
        </div>)
    }
}

export default SpeakerList;