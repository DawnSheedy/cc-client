/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {Component} from 'react';
import { ListGroup, Col, Row } from 'react-bootstrap';

class SpeakerListItem extends Component {
    constructor(props) {
        super(props)
        this.releaseSpeaker = this.releaseSpeaker.bind(this);
        this.deleteSpeaker = this.deleteSpeaker.bind(this);
        this.claimSpeaker = this.claimSpeaker.bind(this);
    }

    releaseSpeaker() {
        this.props.socket.emit('release', {speakerId: this.props.speaker.id})
    }

    deleteSpeaker() {
        this.props.socket.emit('delete-speaker', {speakerId: this.props.speaker.id})
    }

    claimSpeaker() {
        this.props.socket.emit('claim-speaker', {speakerId: this.props.speaker.id})
    }

    render() {
        return(<div className="transition-container"><ListGroup.Item variant={this.props.speaker.writer ? 
        this.props.speaker.writer.id===this.props.user.writerId ? 'primary' : 'success' 
        : 'danger'}>
            <h5>{this.props.speaker.name}</h5>
            <Row>
                <Col>{(this.props.speaker.writer) ? <p>Claimed by: {this.props.speaker.writer.name}</p> : <p>Unclaimed</p>}</Col>
                
                {this.props.user.isAdmin ? <Col className="text-right">{(this.props.speaker.writer) ? 
                <a href="#" onClick={this.releaseSpeaker}>Release</a> : 
                <a href="#" onClick={this.deleteSpeaker}>Delete</a>}
                </Col> : 

                <Col className="text-right">{(!(this.props.speaker.writer)) ? 
                !(this.props.assignment) ? <a href="#" onClick={this.claimSpeaker}>Claim</a> : <span></span> : 
                this.props.speaker.writer.id === this.props.user.writerId ?
                <a href="#" onClick={this.releaseSpeaker}>Release</a>:
                <span></span>}
                </Col>}
            </Row>
        </ListGroup.Item></div>)
    }
}

export default SpeakerListItem;

