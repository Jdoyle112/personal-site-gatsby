import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'


import Layout from '../components/Layout'
import Hero from '../components/home/hero';
import PostPreview from '../components/home/PostPreview';
import Filters from '../components/home/Filters';

const _ = require('lodash');

export default class IndexPage extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			activeTags: []
		}

		this.handleTagClick = this.handleTagClick.bind(this);
	}

	handleTagClick = (tag, add) => {
		let tags = [...this.state.activeTags];
		if(add){
			tags.push(tag);
		} else {
			const index = tags.indexOf(tag);
			tags.splice(index, 1);
		}
		this.setState({
			activeTags: tags
		});
	}

	getAllTags = (posts) => {
		let tags = []
				// Iterate through each post, putting all found tags into `tags`
		posts.forEach(edge => {
			if (_.get(edge, `node.frontmatter.tags`)) {
				tags = tags.concat(edge.node.frontmatter.tags)
			}
		});
				// Eliminate duplicate tags
		tags = _.uniq(tags);
		return tags;
	}

	filterPosts = (posts) => {
		const { activeTags } = this.state;
		if(activeTags.length < 1){
			return posts;
		}

		return posts.filter((post) => {
			return activeTags.some(tag => {
				return post.node.frontmatter.tags.indexOf(tag) > -1;
			})
		});
	}

	render() {
		const { data } = this.props
		let { edges: posts } = data.allMarkdownRemark
		const tags = this.getAllTags(posts);
		posts = this.filterPosts(posts);

		return (
			<Layout>
				<section className="section">
					<Hero />
					<div className="container posts-container">
						<Filters data={tags} activeTags={this.state.activeTags} handler={this.handleTagClick} />
						{posts
							.map(({ node: post }) => (
									<PostPreview data={post} />
						))}
					</div>
				</section>
			</Layout>
		)
  }
}

IndexPage.propTypes = {
  data: PropTypes.shape({
	allMarkdownRemark: PropTypes.shape({
	  edges: PropTypes.array,
	}),
  }),
}

export const pageQuery = graphql`
  query IndexQuery {
	allMarkdownRemark(
	  sort: { order: DESC, fields: [frontmatter___date] },
	  filter: { frontmatter: { templateKey: { eq: "blog-post" } }}
	) {
	  edges {
		node {
		  excerpt(pruneLength: 200)
		  id
		  fields {
			slug
		  }
		  frontmatter {
			title
			templateKey
			date(formatString: "MMMM DD, YYYY")
			tags
		  }
		}
	  }
	}
  }
`
