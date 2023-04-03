import { next } from '@vercel/edge'
import type { RequestContext } from '@vercel/edge';

export const config = {
  runtime: 'edge',
};

async function doWait() {
  const res = { foo: 'bar' }
  await wait(1000);
  console.log('!!!done!!!')
  return res
}
 
const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
 
export default function middleware(req: Request, context: RequestContext) {
  console.log('!!!start!!!')
  context.waitUntil(doWait().then((json) => console.log({ json })))

  //nop
  return next();
}
