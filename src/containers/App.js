import React from 'react';
// import { robots } from './robots';
import Scroll from '../components/Scroll';
import Cardlist from '../components/Cardlist';
import SearchBox from '../components/SearchBox';
import ErrorBondry from '../components/ErrorBondry';
import './App.css';

class App extends React.Component {

    constructor() {
        super()
        this.state = {
            robots:[],
            searchfield: ''
        }
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(users => this.setState({ robots: users}))
    }

    onSearchCange = (event) => {
        this.setState({ searchfield: event.target.value });
        console.log(event.target.value);
    }

    render(){
        const filteredRobots = this.state.robots.filter(robot => {
            return (robot.name.toLowerCase().includes(this.state.searchfield.toLowerCase()))
        });
        return (
            <div className='tc'>
                <h1 className='f1'>RoboFriends</h1>
                <SearchBox searchchange={this.onSearchCange}/>
                <Scroll>
                    <ErrorBondry>
                        <Cardlist robots={filteredRobots} />
                    </ErrorBondry>
                </Scroll>
            </div>
        );
    }
}

export default App;
