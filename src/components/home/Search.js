import React from 'react';


class Search extends React.Component {

    render(){
        return (
            <div className="search-container">
                <input value={this.props.value} onChange={this.props.handler} placeholder="Search for posts.." />
            </div>
        )
    }
}

export default Search;
