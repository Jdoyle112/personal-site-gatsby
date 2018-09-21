import React from 'react';


class Filters extends React.Component {
    constructor(props){
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick = (tag) => {
        console.log("hi")
        this.props.handler(tag, !this.isTagActive(tag));
    }

    isTagActive = (tag) => {
        return this.props.activeTags.indexOf(tag) > -1;
    }

    render(){
        const tags = this.props.data;
        return (
            <div className="filters-container">
                {
                    tags.map(tag => (
                        <div onClick={() => this.handleClick(tag)} className={this.isTagActive(tag) ? "tag active" : "tag"}>
                            <span>{tag}</span>
                        </div>
                    ))
                }
            </div>
        )
    }
}

export default Filters;
