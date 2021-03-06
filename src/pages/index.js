import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'


import Layout from '../components/Layout'
import Hero from '../components/home/hero';
import PostPreview from '../components/home/PostPreview';
import Filters from '../components/home/Filters';
import Search from '../components/home/Search';

const _ = require('lodash');

export default class IndexPage extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			activeTags: [],
			searchTxt: ''
		}

		this.handleTagClick = this.handleTagClick.bind(this);
		this.handleSearchChange = this.handleSearchChange.bind(this);
	}

	handleSearchChange = (e) => {
		this.setState({
			searchTxt: e.target.value
		});
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

	filterPostsBySearch = (posts) => {
		if(!this.state.searchTxt){
			return posts;
		}

		return posts.filter((post) => {
			return post.node.frontmatter.title.includes(this.state.searchTxt);
		});
	}

	render() {
		const { data } = this.props
		let { edges: posts } = data.allMarkdownRemark
		const tags = this.getAllTags(posts);
		posts = this.filterPosts(posts);
		posts = this.filterPostsBySearch(posts);

		return (
			<Layout>
				<section className="section">
					<Hero />
					<div className="container posts-container">
						<div className="grid">
							<Filters data={tags} activeTags={this.state.activeTags} handler={this.handleTagClick} />
							<Search value={this.state.searchTxt} handler={this.handleSearchChange} />
						</div>
						
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
