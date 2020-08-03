/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {Component} from 'react';
import { ListGroup, Col, Row } from 'react-bootstrap';

class CaptionListItem extends Component {
    constructor(props) {
        super(props)
        this.deleteCaption = this.deleteCaption.bind(this);
    }

    deleteCaption() {
        this.props.socket.emit('delete-caption', {captionId: this.props.caption.id})
    }

    render() {
        return(<div className="transition-container"><ListGroup.Item variant={!this.props.caption.cancelled ? 
        !this.props.caption.sent ? 'default' : 'success' 
        : 'danger'}>
            <h5><b>{this.props.caption.speaker.name}:</b> {this.props.caption.caption}</h5>
            <Row>
                <Col><p>Writer: {this.props.caption.writer.name}</p></Col>

                <Col className="text-right">{(!this.props.caption.cancelled && !this.props.caption.sent) ? 
                <a href="#" onClick={this.deleteCaption}>Delete</a> : <p>{(this.props.caption.cancelled) ? "Deleted" : "Sent"}</p>}
                </Col>
            </Row>
        </ListGroup.Item></div>)
    }
}

export default CaptionListItem;

