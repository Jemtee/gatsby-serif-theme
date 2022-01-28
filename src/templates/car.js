import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';

const Car = ({ data }) => {
  const { title } = data.markdownRemark.frontmatter;
  const { image } = data.markdownRemark.frontmatter;
  const { html } = data.markdownRemark;
  return (
    <Layout bodyClass="page-team-single">
      <div className="container pb-6 pt-6 pt-md-10 pb-md-10">
        <div className="row justify-content-start">
          <div className="col-12 col-md-8">
            <div className="service service-single">
              <div className="col-12 col-md-5 col-lg-6 order-1 order-md-2 position-relative">
                <img alt={title} className="intro-image" src={image} />
              </div>
              <h1 className="title">{title}</h1>
              <div className="content" dangerouslySetInnerHTML={{ __html: html }} />
            </div>
          </div>
        </div>
      </div>
      {/* TODO: add related vihecles + "back to garage" or breadcrumbs */}
    </Layout>
  );
};

export const query = graphql`
  query($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        image
      }
      fields {
        slug
      }
      html
    }
  }
`;

export default Car;
