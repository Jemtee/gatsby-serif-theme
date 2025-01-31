// import * as React from 'react';
// import { useStaticQuery, graphql } from 'gatsby';
// import PostCard from '../../../components/post-card/post-card';
// import Pagination from '../../../components/pagination/pagination';
// import BlogPostsWrapper from './style';

// type PostsProps = {};

// const Posts: React.FunctionComponent<PostsProps> = () => {
//   const Data = useStaticQuery(graphql`
//     query {
//       site {
//         siteMetadata {
//           title
//         }
//       }
//       allSitePage(filter: { path: { eq: "/page/1" } }) {
//         nodes {
//           pageContext
//         }
//       }
//       allMarkdownRemark(
//         sort: { fields: [frontmatter___date], order: DESC }
//         limit: 4
//       ) {
//         totalCount
//         edges {
//           node {
//             excerpt(pruneLength: 300)
//             fields {
//               slug
//             }
//             frontmatter {
//               date(formatString: "DD [<span>] MMM [</span>]")
//               title
//               // description
//               tags
//               cover {
//                 childImageSharp {
//                   gatsbyImageData(
//                     layout: FULL_WIDTH
//                     placeholder: BLURRED
//                     formats: [AUTO, WEBP, AVIF]
//                   )
//                 }
//               }
//             }
//           }
//         }
//       }
//     }
//   `);

//   const Posts = Data?.allMarkdownRemark?.edges;
//   const TotalPage = Data?.allSitePage?.nodes[0]?.pageContext?.numPages;
//   const CurrentPage = Data?.allSitePage?.nodes[0]?.pageContext?.currentPage;

//   return (
//     <BlogPostsWrapper>
//       {Posts.map(({ node }: any) => {
//         const title = node.frontmatter.title || node.fields.slug;
//         return (
//           <PostCard
//             key={node.fields.slug}
//             title={title}
//             image={
//               node.frontmatter.cover == null
//                 ? null
//                 : node.frontmatter.cover.childImageSharp.gatsbyImageData
//             }
//             url={node.fields.slug}
//             description={node.frontmatter.description || node.excerpt}
//             date={node.frontmatter.date}
//             tags={node.frontmatter.tags}
//           />
//         );
//       })}

//       {TotalPage >> 1 ? (
//         <Pagination
//           nextLink="/page/2"
//           currentPage={CurrentPage}
//           totalPage={TotalPage}
//         />
//       ) : (
//         ''
//       )}
//     </BlogPostsWrapper>
//   );
// };

// export default Posts;
