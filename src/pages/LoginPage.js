import React, { Component } from 'react';
import { Container, Col, Card, Form, Button } from 'react-bootstrap';

class LoginPage extends Component {
    constructor(props) {
        super(props)
        this.state = { key: '' };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ key: event.target.value });
    }

    handleSubmit(event) {
        this.props.setToken(this.state.key);
        event.preventDefault();
    }


    render() {
        return (
            <div>
                <Container>
                    <Col xs="12" md={{ span: 4, offset: 4 }}>
                        <Card>
                            <Card.Body>
                                <Card.Title>CC Login</Card.Title>
                                <Card.Subtitle>You should have received a key. Reach out to Tech for help.</Card.Subtitle>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Label>Key</Form.Label>
                                    <Form.Control type="password" value={this.state.key} onChange={this.handleChange} placeholder="Key"></Form.Control>
                                    <Form.Text className="text-muted">Never share your key.</Form.Text>
                                    <Button variant="primary" type="submit">
                                        Submit
                                </Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Container>
            </div>
        )
    }
}

export default LoginPage;