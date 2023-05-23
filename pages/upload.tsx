// add photo button
// text box for name, show card with image
// confirm button, post to notion api

import dynamic from 'next/dynamic'
const DynamicUpload = dynamic(() => import('../components/pages/Upload'))

export default function Upload() {
  return <DynamicUpload />;
}
