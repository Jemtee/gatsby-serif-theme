import React from 'react';
import { graphql, Link } from 'gatsby';
import SEO from '../components/SEO';
import Layout from '../components/Layout';
import Call from '../components/Call';

const Garaget = props => {
  const car = props.data.car.edges;
  const { intro } = props.data;
  const introImageClasses = `intro-image ${intro.frontmatter.intro_image_absolute && 'intro-image-absolute'} ${intro.frontmatter.intro_image_hide_on_mobile && 'intro-image-hide-mobile'}`;

  return (
    <Layout bodyClass="page-teams">
      <SEO title="Cars" />

      <div className="intro">
        <div className="container">
          <div className="row justify-content-start">
            <div className="col-12 col-md-7 col-lg-6 order-2 order-md-1">
              <div dangerouslySetInnerHTML={{ __html: intro.html }} />
            </div>
            {intro.frontmatter.intro_image && (
              <div className="col-12 col-md-5 col-lg-6 order-1 order-md-2 position-relative">
                <img alt={intro.frontmatter.title} className={introImageClasses} src={intro.frontmatter.intro_image} />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          {car.filter(edge => (edge.node.frontmatter.promoted)).map(({ node }) => (
            <div key={node.id} className="col-12 col-md-6 mb-2">
              <Link to={node.fields.slug}>
                <div className="team team-summary team-summary-large">
                  {node.frontmatter.image && (
                    <div className="team-image">
                      <img alt={`photo of ${node.frontmatter.title}`} className="img-fluid mb-2" src={node.frontmatter.image} />
                    </div>
                  )}
                  <div className="team-meta">
                    <h2 className="team-name">{node.frontmatter.title}</h2>
                    <p className="team-description">{node.frontmatter.descr}</p>
                    {node.frontmatter.linkedin && (
                      <a target="_blank" href="{{ .Params.Linkedinurl }}">LinkedIn</a>
                    )}
                  </div>
                  <div className="team-content">
                    <p>{node.excerpt}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
        <div className="row pt-6 pb-6">
          {car.filter(edge => (!edge.node.frontmatter.promoted)).map(({ node }) => (
            <div key={node.id} className="col-12 col-md-6 mb-2">
              <Link to={node.fields.slug}>
                <div className="team team-summary">
                  {node.frontmatter.image && (
                    <div className="team-image">
                      <img alt={`photo of ${node.frontmatter.title}`} className="img-fluid mb-2" src={node.frontmatter.image} />
                    </div>
                  )}
                  <div className="team-meta">
                    <h2 className="team-name">{node.frontmatter.title}</h2>
                    <p className="team-description">{node.frontmatter.descr}</p>
                    {node.frontmatter.linkedin && (
                      <a target="_blank" href="{{ .Params.Linkedinurl }}">LinkedIn</a>
                    )}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

    </Layout>
  );
};

export const query = graphql`
  query CarQuery {
    car: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/garaget\/.*/" } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          id
          excerpt
          fields {
            slug
          }
          frontmatter {
            title
            promoted
            image
            descr
          }
        }
      }
    }
    intro: markdownRemark(fileAbsolutePath: {regex: "/(garaget.md)/"}) {
      html
      frontmatter {
        image
        intro_image
        intro_image_absolute
        intro_image_hide_on_mobile
        title
      }
    }
  }
`;

export default Garaget;
