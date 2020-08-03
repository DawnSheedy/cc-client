import React, { Component } from 'react';
import { Form, Button, InputGroup, FormControl } from 'react-bootstrap';

class SpeakerCreator extends Component {

    constructor(props) {
        super(props)

        this.state = {
            speakerName: ""
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.createSpeaker= this.createSpeaker.bind(this);
    }

    handleChange(event) {
        this.setState({ speakerName: event.target.value });
    }

    handleSubmit(event) {
        this.createSpeaker();
        event.preventDefault();
    }

    createSpeaker() {
        if (!this.state.speakerName) return;
        this.props.socket.emit('new-speaker', { name: this.state.speakerName });
        document.getElementById('createSpeakerForm').value = '';
        this.setState({speakerName: ''});
    }
    
    render() {
        return (<div>
            <InputGroup className="mb-3" onChange={this.handleChange} value={this.state.speakerName} onKeyPress={event => { if(event.key === "Enter") {
                this.createSpeaker();
            }}}>
                <FormControl id='createSpeakerForm'
                    placeholder="SuperMCGamer"
                />
                <InputGroup.Append>
                    <Button variant="outline-primary" onClick={this.handleSubmit}>Create</Button>
                </InputGroup.Append>
            </InputGroup>
            <hr />
        </div>)
    }
}

export default SpeakerCreator;