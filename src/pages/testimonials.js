import React from 'react';
import { Link, graphql } from 'gatsby';
import SEO from '../components/SEO';
import Layout from '../components/Layout';
import ReCAPTCHA from "react-google-recaptcha";

const Testimonials = props => {
  const testimonials = props.data.testimonials.edges;
  const { intro } = props.data;
  const introImageClasses = `intro-image ${intro.frontmatter.intro_image_absolute && 'intro-image-absolute'} ${intro.frontmatter.intro_image_hide_on_mobile && 'intro-image-hide-mobile'}`;

  return (
    <Layout bodyClass="page-services">
      <SEO title="Testimonials" />

      <div className="intro">
        <div className="container">
          <div className="row justify-content-start">
            <div className="col-12 col-md-7 col-lg-6 order-2 order-md-1">
              <div dangerouslySetInnerHTML={{ __html: intro.html }} />
            </div>
            {intro.frontmatter.intro_image && (
              <div className="col-12 col-md-5 col-lg-6 order-1 order-md-2 position-relative">
                {/* <img alt={intro.frontmatter.title} className={introImageClasses} src={intro.frontmatter.intro_image} /> */}
                <form
                  name="Contact Form"
                  method="POST"
                  data-netlify="true"
                  action="/form-success"
                  data-netlify-recaptcha="true"
                >
                  <input type="hidden" name="form-name" value="Contact Form" />
                  <div>
                    <label>Your Email:</label>
                    <input type="email" name="email" />
                  </div>
                  <div>
                    <label>Message:</label>
                    <textarea name="message" />
                  </div>
                  <br />
                  <ReCAPTCHA sitekey="6LcWEloUAAAAACEBAKA17nXUPDvPJ9crcrYhxdz3" />
                  <button type="submit">Send</button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="container pb-6">
        <div className="row">
          {testimonials.map((edge) => (
            <div key={edge.node.id} className="col-12 col-md-4 mb-1">
              <div className="card service service-teaser">
                <div className="card-content">
                  <h2>
                    <Link to={edge.node.fields.slug}>
                      {edge.node.frontmatter.title}
                    </Link>
                  </h2>
                  <p>{edge.node.excerpt}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export const query = graphql`
  query TestimonialsQuery {
    testimonials: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/testimonials\/.*/" } }
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
          }
        }
      }
    }
    intro: markdownRemark(fileAbsolutePath: {regex: "/(testimonials.md)/"}) {
      html
      frontmatter {
        title
        image
        intro_image
        intro_image_absolute
        intro_image_hide_on_mobile
      }
    }
  }
`;

export default Testimonials;
