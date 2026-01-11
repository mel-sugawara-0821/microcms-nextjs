import { GetStaticPaths, GetStaticProps, NextPage } from 'next';

type PreviewData = {
  slug: string;
  draftKey?: string;
};

export const getStaticPaths: GetStaticPaths = () => {
  console.log('getStaticPaths---------')

  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params, previewData }) => {    
    console.log('getStaticProps---------')
    console.log(process.env.NODE_ENV)

  const contentId = params?.slug;

  if (!contentId) {
    console.log('getStaticProps-2--------')
    return { notFound: true };
  }

  // const draftKey = previewData?.draftKey;
  const { draftKey } = (previewData as PreviewData) || {};

  const url = `https://${process.env.MICROCMS_SERVICE_DOMAIN}.microcms.io/api/v1/blogs/${contentId}${draftKey ? `?draftKey=${draftKey}` : ''}`
  console.log('contentId-------------------')
  console.log(contentId)

  console.log('draftKey-------------------')
  console.log(draftKey)
  
  console.log('url---------------------')
  console.log(url)

  const post = await fetch(
    url
    ,
    {
      headers: { 'X-MICROCMS-API-KEY': process.env.API_KEY || '' },
    }
  ).then((res: any) => {
    console.log('microCMS status:', res.status);
    console.log(res)
    return res.json();
  });

  console.log('getStaticProps-3--------')
  console.log(post)

  if (!post) {
    console.log('getStaticProps-4--------')
    return { notFound: true };
  }
    console.log('getStaticProps-5--------')

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