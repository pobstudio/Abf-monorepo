import chokidar from 'chokidar';
import { EventEmitter } from 'events';
import getPort from 'get-port';
import { createServer } from 'http';
import path from 'path';

export const getSvgHotLoadingServer = async (
  handler: () => Promise<string>,
) => {
  const events = new EventEmitter();

  function requestListener(req: any, res: any) {
    if (req.url === '/changes') {
      res.setHeader('Content-Type', 'text/event-stream');
      res.writeHead(200);
      const sendEvent = () => res.write('event: change\ndata:\n\n');
      events.on('change', sendEvent);
      req.on('close', () => events.off('change', sendEvent));
      return;
    }

    if (req.url === '/') {
      res.writeHead(200);
      handler().then(
        (content) => res.end(getWebpageContent(content)),
        (error) => res.end(getWebpageContent(`<pre>${error.message}</pre>`)),
      );
      return;
    }

    res.writeHead(404);
    res.end('Not found: ' + req.url);
  }

  const server = createServer(requestListener);
  const portNumber = await getPort({ port: getPort.makeRange(9900, 9999) });

  await new Promise((res: any) => server.listen(portNumber, res));
  console.log(`SVG dev server is hosted on  http://localhost:${portNumber}`);
  const notify = () => events.emit('change');

  const contractsFolder = path.resolve(__dirname, '..', 'contracts');

  chokidar.watch(contractsFolder).on('all', (event, path) => {
    console.log(event, path);
    notify();
  });

  await new Promise((resolve) => setTimeout(resolve, 2_000_000_000));
};

const getWebpageContent = (content: string) => `
<html>
<title>SVG</title>
${content}
<script>
const sse = new EventSource('/changes');
sse.addEventListener('change', () => window.location.reload());
</script>
</html>
`;
