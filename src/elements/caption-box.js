import React, { Component } from 'react'
import { InputGroup, FormControl, Button } from 'react-bootstrap';

class CaptionBox extends Component {
    constructor(props) {
        super(props)

        this.state = {
            caption: ""
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.createSpeaker= this.createCaption.bind(this);
    }

    handleChange(event) {
        if (event.target.value.charAt(0) == ' ') {
            event.target.value = event.target.value.substr(1);
        }
        this.setState({ caption: event.target.value });
        /*if (this.state.caption.length > 80) {
            this.createCaption();
        }*/
    }

    handleSubmit(event) {
        this.createCaption();
        event.preventDefault();
    }

    createCaption() {
        if (!this.state.caption) return;

        let caption = this.state.caption;
        let remainder = '';

        /*if (caption.length > 80) {
            for (let i=80; i>=0; i--) {
                if (caption.charAt(i) === ' ') {
                    remainder = caption.substr(i+1);
                    caption = caption.substr(0,i);
                    break;
                }
            }
        }*/

        this.props.socket.emit('new-caption', { caption: caption });
        document.getElementById('createCaptionForm').value = remainder;
        this.setState({caption: remainder});
    }

    render() {
        return (<div>
            <InputGroup className="mb-3" disabled={(!this.props.speaker)} onChange={this.handleChange} value={this.state.caption} onKeyPress={event => { if(event.key === "Enter") {
                this.createCaption();
            }
            if (this.state.caption.length > 70 && event.charCode === 32) {
                this.createCaption();
            }}}>
                <FormControl id='createCaptionForm'
                    placeholder="Type along to audio here."
                />
                <InputGroup.Append>
                    <Button variant="outline-primary" onClick={this.handleSubmit}>Send</Button>
                </InputGroup.Append>
            </InputGroup>
        </div>)
    }
}

export default CaptionBox;