const path = require('path');
const { createFilePath } = require(`gatsby-source-filesystem`);

// Generate slug field for all markdown files
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `content` });
    createNodeField({
      node,
      name: `slug`,
      value: slug
    });
  }
};

// Create pages from markdown files
exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  return new Promise((resolve, reject) => {
    resolve(
      graphql(
        `
          query {
            sokes: allMarkdownRemark(
              filter: { fileAbsolutePath: { regex: "content/sokes\/.*/" } }
              sort: { fields: [frontmatter___date], order: DESC }
            ) {
              edges {
                node {
                  id
                  excerpt
                  frontmatter {
                    title
                    date(formatString: "DD MMMM YYYY")
                  }
                  fields {
                    slug
                  }
                }
              }
            }
            testimonials: allMarkdownRemark(
              filter: { fileAbsolutePath: { regex: "content/testimonials\/.*/" } }
              sort: { fields: [frontmatter___date], order: DESC }
            ) {
              edges {
                node {
                  id
                  excerpt
                  frontmatter {
                    title
                    date(formatString: "DD MMMM YYYY")
                  }
                  fields {
                    slug
                  }
                }
              }
            }
            garaget: allMarkdownRemark(
              filter: { fileAbsolutePath: { regex: "content/garaget\/.*/" } }
              sort: { fields: [frontmatter___date], order: DESC }
            ) {
              edges {
                node {
                  id
                  excerpt
                  frontmatter {
                    title
                    promoted
                    image
                    date(formatString: "DD MMMM YYYY")
                  }
                  fields {
                    slug
                  }
                }
              }
            }
            basic: allMarkdownRemark(
              filter: { fileAbsolutePath: { regex: "content/basic\/.*/" } }
            ) {
              edges {
                node {
                  id
                  excerpt
                  html
                  frontmatter {
                    title
                    path
                    template
                  }
                  fields {
                    slug
                  }
                }
              }
            }
            blog: allMarkdownRemark(
              filter: { fileAbsolutePath: { regex: "content/post\/.*/" } }
            ) {
              edges {
                node {
                  id
                  excerpt
                  html
                  frontmatter {
                    title
                    image
                  }
                  fields {
                    slug
                  }
                }
              }
            }
          }
        `,
      ).then(result => {
        result.data.sokes.edges.forEach(({ node }) => {
          const component = path.resolve('src/templates/service.js');
          createPage({
            path: node.frontmatter.path ? node.frontmatter.path : node.fields.slug,
            component,
            context: {
              id: node.id
            }
          });
        });
        result.data.testimonials.edges.forEach(({ node }) => {
          const component = path.resolve('src/templates/testimonial.js');
          createPage({
            path: node.frontmatter.path ? node.frontmatter.path : node.fields.slug,
            component,
            context: {
              id: node.id
            }
          });
        });
        result.data.garaget.edges.forEach(({ node }) => {
          const component = path.resolve('src/templates/car.js');
          createPage({
            path: node.frontmatter.path ? node.frontmatter.path : node.fields.slug,
            component,
            context: {
              id: node.id
            }
          });
        });
        result.data.basic.edges.forEach(({ node }) => {
          let component = path.resolve('src/templates/basic.js');
          if (node.frontmatter.template) {
            component = path.resolve(`src/templates/${node.frontmatter.template}.js`);
          }
          createPage({
            path: node.frontmatter.path ? node.frontmatter.path : node.fields.slug,
            component,
            context: {
              id: node.id
            }
          });
        });
        result.data.blog.edges.forEach(({ node }) => {
          let component = path.resolve('src/templates/blog-post-test.js');
          if (node.frontmatter.template) {
            component = path.resolve(`src/templates/${node.frontmatter.template}.js`);
          }
          createPage({
            path: node.frontmatter.path ? node.frontmatter.path : node.fields.slug,
            component,
            context: {
              id: node.id
            }
          });
        });
        resolve();
      }),
    );
  });
};
