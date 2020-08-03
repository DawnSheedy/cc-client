import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import SpeakerList from '../elements/speaker-list';
import EventList from '../elements/event-list'

class MainPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            currentSpeaker: null
        }
    }

    componentDidMount() {
        if (this.props.user.isAdmin) {
            return;
        }
        this.props.socket.on('speaker', (data) => {

            //If the received speaker has no writer and the ID matches the current one, it means it has been released
            if (!data.writer) {
                if (this.state.currentSpeaker) {
                    if (this.state.currentSpeaker.id === data.id) {
                        this.setState({ currentSpeaker: null })
                    }
                }
                return;
            }

            //We've been assigned!
            if (data.writer.id === this.props.user.writerId) {
                this.setState({ currentSpeaker: data })
            }
        })
    }

    render() {
        return (<div class="app-container">
            <Row style={{margin: 0, height: "100%" }}>
                <Col xs="12" md="4" lg="4"><SpeakerList socket={this.props.socket} user={this.props.user} assignment={this.state.currentSpeaker}/></Col>
                <Col xs="12" md="8" lg="8"><EventList socket={this.props.socket} user={this.props.user} assignment={this.state.currentSpeaker} /></Col>
            </Row>
        </div>)
    }
}

export default MainPage;