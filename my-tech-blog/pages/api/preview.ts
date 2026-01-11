import type { NextApiHandler } from 'next';
import fetch from 'node-fetch';
    console.log('apiUrl-ここ------------------');

const handlePreviewRequest: NextApiHandler = async (req, res) => {
      console.log('apiUrl-1------------------');

  const slug = typeof req.query.slug === 'string' ? req.query.slug : '';
  const draftKey = typeof req.query.draftKey === 'string' ? req.query.draftKey : '';
  const type = typeof req.query.type === 'string' ? req.query.type : 'blogs';

  if (!slug) {
    return res.status(404).end();
  }

  const apiUrl = `https://${process.env.MICROCMS_SERVICE_DOMAIN || ''}.microcms.io/api/v1/${type}/${slug}?fields=id&draftKey=${draftKey}`;
  console.log('apiUrl-------------------');
  console.log(apiUrl);
  


  const content: any = await fetch(apiUrl, {
    headers: { 'X-MICROCMS-API-KEY': process.env.API_KEY || '' },
  }).then((res) => res.json()).catch((error) => {
  console.log('apiUrl-1------------------');
    
    console.log(error);
    return null;
  });

  if (!content) {
  console.log('apiUrl-2------------------');
    return res.status(404).json({ message: 'Invalid slug' });
  }
    console.log('apiUrl-3------------------');
    console.log(content);



  res.setPreviewData({ slug: content.id, draftKey });
    console.log('apiUrl-4------------------');
  
  res.writeHead(307, { Location: `/${type}/${slug}` });
    console.log('apiUrl-5------------------');
  
//   res.writeHead(307, { Location: `/blogs` });
  
  res.end('Preview mode enabled');
};

export default handlePreviewRequest;