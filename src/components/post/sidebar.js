import React, { Component } from 'react'
import { graphql, StaticQuery } from 'gatsby'
import PropTypes from 'prop-types'
import { navigate } from "gatsby";

const PostLink = ({ data }) => {
    const { title, date } = data.frontmatter;
    const { slug } = data.fields;
    return (
        <li className="post-link" onClick={() => navigate(slug)}>
            <p>{title}</p>
            <span className="light mono">{date}</span>
        </li>
    )
}

const Sidebar = ({ data }) => {
    let { edges: posts } = data.allMarkdownRemark;
    return (
        <div className="sidebar">
            <h3>Recent Posts</h3>
            <ul>
                {
                    posts.map(({ node: post }) => {
                        return (
                            <PostLink data={post} />
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default props => (
    <StaticQuery
        query={postsQuery}
        render={data => <Sidebar data={data} {...props} />}
    />
)

Sidebar.PropTypes = {
    data: PropTypes.shape({
        allMarkdownRemark: PropTypes.shape({
            edges: PropTypes.array,
        }),
    }),
}

const postsQuery = graphql`
  query RecentPostsQuery {
	allMarkdownRemark(
	  sort: { order: DESC, fields: [frontmatter___date] },
      filter: { frontmatter: { templateKey: { eq: "blog-post" } }},
      limit: 10
	) {
	  edges {
		node {
		  id
		  fields {
			slug
		  }
		  frontmatter {
			title
			date(formatString: "MMMM DD, YYYY")
		  }
		}
	  }
	}
  }
`

