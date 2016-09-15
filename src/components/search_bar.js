import React, {Component} from 'react';

class SearchBar extends Component {
    constructor(props) {
        super(props);

        this.state = { term: '' };
    }

    render() {
        return (
        <div className="search-bar">
        <h1 className="title">YouSearch</h1>
            <input 
                value={this.state.term}
                onChange={event => this.onInputChange(event.target.value)} />
        </div>
        );
    }

    onInputChange(term) {
        this.setState({term:term});
        this.props.onSearchTermChange(term);
    }
}

export default SearchBar;