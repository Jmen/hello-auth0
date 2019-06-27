import React, {Component} from 'react';

class Public extends Component {

    state = {
        message: ""
    };

    componentDidMount() {
        fetch("/public")
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else { throw new Error("error with request from server") }
            })
            .then(response => {
                this.setState({ message: response.message });
            })
            .catch(error => {
                this.setState({ message: error.message });
            });
    }

    render() {
        return (
            <p>
                { this.state.message }
            </p>
        );
    }
}

export default Public;