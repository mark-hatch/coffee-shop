/* The file’s default export, as usual, is the React component for the template page. There’s also a named export called query. This is the page query. The exported query will be executed by Gatsby when building the site. Note that the query takes a $slug parameter. This will receive the slug context parameter in the createPages function we’ll write next.
The slug is passed as an argument to the markdownRemark query to look up the specific blog post. We’re querying for the rendered HTML and the title from the front matter.
The page component receives the result of the GraphQL query as the data prop. We then use the values in the data prop to populate the blog post page. In particular, we use React’s dangerouslySetInnerHTML to set the rendered HTML from Remark as the inner HTML of the element.
*/
import React from 'react';
 
import { graphql } from 'gatsby';

import Layout from '../components/Layout';

import styles from './blog.module.css';

export default function BlogTemplate({ data }) {
    return (
        <Layout>
            <div className={styles.blog}>
            <h1>{data.markdownRemark.frontmatter.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
            </div>
        </Layout>
        );
    }

export const query = graphql`
query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
        html
        frontmatter {
            title
        }
    }
}
`;