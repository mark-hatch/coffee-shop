/* First, we require a helper function, createFilePath, from the gatsby-source- filesystem plugin. This function creates a URL from a file’s path.
Next, we implement the onCreateNode function. The argument to this function is destructured to get the node, a helper function called getNode, and an actions object containing some other actions that can be performed on the node.
We then destructure the actions object and pull out the createNodeField function, which is used to add additional fields to a node. These new fields are added under a field called fields.
This function gets called whenever a node of any type is created. We only want
to perform this action when the node being created represents a Markdown file, so we check if the node’s type is MarkdownRemark. If it is, then we use createFilePath to generate the slug for the file.
Finally, we call createNodeField to add the slug field to the node.
 */
const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');
exports.onCreateNode = function({ node, getNode, actions }) { const { createNodeField } = actions;
  if (node.internal.type === 'MarkdownRemark') {
    const slug = createFilePath({ node, getNode });
    createNodeField({
      node,
      name: 'slug',
      value: slug
}); }
};

/* We’ve added the Gatsby createPages API to this file. As with onCreateNode, there is an actions property that contains various helper functions. We use destructuring to access the createPage action. Next, we perform a GraphQL query to find the slugs of all of the blog posts.
Note that this GraphQL query looks a little different than other queries we’ve seen so far. Earlier, we saw queries defined using the graphql tag on a template string. Here, graphql is a function we call to execute the query, which is supplied as a string argument.
The graphql function returns a Promise. To simplify the code a bit, we use the async/await syntax instead. This allows us to have asynchronous code written in a synchronous style.
Once we have the slugs, we iterate over the results and call createPage for each.
The path is the URL of the page, the component references our template page, and the context contains a slug property. This slug value is what is passed as an argument to the page query in our blog template page, which will be used to query for the full data for each blog post.
 */
exports.createPages = async function({ graphql, actions }) {
    const { createPage } = actions;
    const result = await graphql(`
    query {
        allMarkdownRemark {
            edges {
                node {
                    fields {
                        slug }
                    }
                }
            }
        }
    `);
    result.data.allMarkdownRemark.edges
    .forEach(({ node }) => {
        createPage({
            path: node.fields.slug, 
            component: path
            .resolve('./src/templates/blog.js'),
            context: {
                slug: node.fields.slug }
            });
        });
};

