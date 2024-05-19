import {Component} from 'react';
import {withRouter} from 'react-router-dom';

class ClientEdit extends Component {

    emptyItem = {
        name: '',
        email: ''
    };

    constructor(props) {
        super(props);
        this.state = {
            item: this.emptyItem
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
}

export default withRouter(ClientEdit);
