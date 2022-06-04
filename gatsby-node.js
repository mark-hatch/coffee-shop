/* First, we require a helper function, createFilePath, from the gatsby-source- filesystem plugin. This function creates a URL from a file’s path.
Next, we implement the onCreateNode function. The argument to this function is destructured to get the node, a helper function called getNode, and an actions object containing some other actions that can be performed on the node.
We then destructure the actions object and pull out the createNodeField function, which is used to add additional fields to a node. These new fields are added under a field called fields.
This function gets called whenever a node of any type is created. We only want
to perform this action when the node being created represents a Markdown file, so we check if the node’s type is MarkdownRemark. If it is, then we use createFilePath to generate the slug for the file.
Finally, we call createNodeField to add the slug field to the node.
 */
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
