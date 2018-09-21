import React from 'react';
import { navigate } from "gatsby";


class PostPreview extends React.Component {
    constructor(props){
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick = () => {
        navigate(this.props.data.fields.slug);
    }

    render(){
        const post = this.props.data;
        return (
            <div className="post-preview-container" onClick={this.handleClick}>
                <div className="inner">
                    <h3>{post.frontmatter.title}</h3>
                    <span className="light mono">{post.frontmatter.date}</span>
                    <p>{post.excerpt}</p>
                    <div>
                        {
                            post.frontmatter.tags.map(tag => (
                                <div className="tag-meta"><span>{tag}</span></div>
                            ))
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default PostPreview;
