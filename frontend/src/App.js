import './App.css';
import {Component} from "react";
import {Router} from "react-router-dom";

class App extends Component {
    state = {
        clients: []
    };

    async componentDidMount() {
        const response = await fetch('/clients');
        const body = await response.json();
        this.setState({clients: body});
    }

    render() {
        return (
            <Router>
                <Switch>
                    <Route path='/' exact={true} component={Home}/>
                    <Route path='/clients' exact={true} component={ClientList}/>
                    <Route path='/clients/:id' component={ClientEdit}/>
                </Switch>
            </Router>
        )
    }
}
export default App;
