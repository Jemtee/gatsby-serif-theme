import React from 'react';
import { graphql, Link } from 'gatsby';
import Helmet from 'react-helmet';
import SEO from '../components/SEO';
import Layout from '../components/Layout';
import Call from '../components/Call'; //remove later potentially
import ReCAPTCHA from "react-google-recaptcha";
// import Slider from "react-slick";

const Home = props => {
  const intro = props.data.intro;
  const site = props.data.site.siteMetadata;
  const services = props.data.services.edges;
  const testimonials = props.data.testimonials.edges;
  const features = props.data.features.edges;
  const introImageClasses = `intro-image`;

  return (
    <Layout bodyClass="page-home">
      <SEO title={site.title} />
      <Helmet>
        <meta
          name="description"
          content="Small Business Theme. Multiple content types using Markdown and JSON sources. Responsive design and SCSS. This is a beautiful and artfully designed starting theme."
        />
      </Helmet>

      {intro.frontmatter.intro_image && (
        // <div className="col-12 col-md-12 col-lg-12 order-1 order-md-1">
          <img
            alt={intro.frontmatter.title}
            className={introImageClasses}
            src={intro.frontmatter.intro_image}
          />
        // </div>
      )}
      <div className="intro">
        <div className="container">
          <div className="row justify-content-start">
            <div className="col-7 col-md-7 col-sm-7 order-1 order-md-1">
              <div dangerouslySetInnerHTML={{ __html: intro.html }} />
            </div>
            <div className="col-5 col-md-5 col-sm-5 order-2 order-md-2">

              <Call showButton />
              <form
                name="Contact Form"
                method="POST"
                data-netlify="true"
                action="/form-success"
                data-netlify-recaptcha="true"
              >
                <input type="hidden" name="form-name" value="Contact Form" />
                <div>
                  <label>Email:</label>
                  <input type="email" id="email" name="email" />
                </div>
                <div>
                  <label>Telefon:</label>
                  <input type="tel" id="phone" name="phone" />
                </div>
                <div className="formMessageContainer">
                  <label>Meddelande:</label>
                  <textarea id="message" name="message" />
                </div>
                <br />
                <ReCAPTCHA sitekey="6LcWEloUAAAAACEBAKA17nXUPDvPJ9crcrYhxdz3" />
                <button type="submit" className="button button-primary">
                  Kontakta oss
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {testimonials.length > 0 && (
        <div className="strip">
          <div className="container pt-6 pb-6 pb-md-10">
            <h2>Vad andra säger</h2>
            {/* export default function SimpleSlider() {
            const settings = {
              dots: true,
              infinite: true,
              speed: 500,
              slidesToShow: 1,
              slidesToScroll: 1
            };return (
            <Slider {...settings}>
              <div>
                <h3>1</h3>
              </div>
              <div>
                <h3>2</h3>
              </div>
              <div>
                <h3>3</h3>
              </div>
              <div>
                <h3>4</h3>
              </div>
              <div>
                <h3>5</h3>
              </div>
              <div>
                <h3>6</h3>
              </div>
            </Slider>
            );
            } */}
            <div className="row justify-content-start">
              {testimonials.map(({ node }) => (
                <div key={node.id} className="col-12 col-md-4 mb-1">
                  <div className="service service-summary">
                    <div className="service-content">
                      <h3 className="service-title">
                        {/* <Link to={node.fields.slug}> */}
                        {node.frontmatter.title}
                        {/* </Link> */}
                      </h3>
                      <p>{node.excerpt}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="row justify-content-center">
              <div className="col-auto">
                <Link className="button button-primary" to="/testimonials/">
                  Lämna eget omdöme
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {services.length > 0 && (
        <div className="strip">
          <div className="container pt-6 pb-6 pb-md-10">
          <h2 className="text-center">Vad vi söker</h2>
            <div className="row justify-content-start">
              {services.map(({ node }) => (
                <div key={node.id} className="col-12 col-md-4 mb-1">
                  <div className="service service-summary">
                    <div className="service-content feature">
                      {node.frontmatter.thumb_image && (
                        <div className="feature-image">
                          <img src={node.frontmatter.thumb_image} />
                        </div>
                      )}
                      <h2 className="service-title">
                        <Link to={node.fields.slug}>
                          {node.frontmatter.title}
                        </Link>
                      </h2>
                      <p>{node.excerpt}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="row justify-content-center">
              <div className="col-auto">
                <Link className="button button-primary" to="/sokes/">
                  Se alla bilar vi söker
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}


      {features.length > 0 && (
        <div className="strip strip-grey">
          <div className="container pt-6 pb-6 pt-md-10 pb-md-10">
            <h2 className="text-center">Vad vi söker</h2>
            <div className="row justify-content-center">
              {features.map(({ node }) => (
                <div key={node.id} className="col-12 col-md-6 col-lg-4 mb-2">
                  <div className="feature">
                    {node.image && (
                      <div className="feature-image">
                        <img src={node.image} />
                      </div>
                    )}
                    <h2 className="feature-title">{node.title}</h2>
                    <div className="feature-content">{node.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export const query = graphql`
  query {
    services: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/sokes\/.*/" } }
      sort: { fields: [frontmatter___weight], order: ASC }
      limit: 6
    ) {
      edges {
        node {
          id
          frontmatter {
            thumb_image
            title
            date(formatString: "DD MMMM YYYY")
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
    testimonials: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/testimonials\/.*/" } }
      sort: { fields: [frontmatter___weight], order: ASC }
      limit: 3
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM YYYY")
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
    intro: markdownRemark(
      fileAbsolutePath: {regex: "/content/index.md/"}
    ) {
        html
        frontmatter {
          image
          intro_image
          intro_image_absolute
          intro_image_hide_on_mobile
          title
        }
    }
    features: allFeaturesJson {
      edges {
        node {
          id
          title
          description
          image
        }
      }
    }
    site {
      siteMetadata {
        title
      }
    }
  }
`;

export default Home;
