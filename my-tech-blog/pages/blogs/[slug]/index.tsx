import { GetStaticPaths, GetStaticProps, NextPage } from 'next';

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params, previewData }) => {    
  const contentId = params?.slug;

  if (!contentId) {
    return { notFound: true };
  }



  const draftKey = previewData?.draftKey;


  const post = await fetch(
    `https://${process.env.MICROCMS_SERVICE_DOMAIN}.microcms.io/api/v1/blogs/${contentId}${
      draftKey ? `?draftKey=${draftKey}` : ''
    }`,
    {
      headers: { 'X-MICROCMS-API-KEY': process.env.API_KEY || '' },
    }
  ).then((res) => res.json());



  if (!post) {
  console.log('post-1---------')
    return { notFound: true };
  }
    console.log('post-2---------')


  return {
    props: {
      post,
    },
    revalidate: 60,
  };
};

const BlogPage: NextPage<any> = ({ post }) => {
  return (
    <main>
      <h1>{post.title}</h1>
      <h2>{post.body}</h2>
    </main>
  );
};

export default BlogPage;