import { RegisteredRenderer } from '../generated/RendererRegistry/RendererRegistry';
import { Renderer } from '../generated/schema';

export function handleRegisteredRenderer(event: RegisteredRenderer): void {
  let renderer = Renderer.load(event.params.id.toHexString());
  if (renderer == null) {
    // TODO: map hash in
    renderer = new Renderer(event.params.id.toHexString());
    renderer.address = event.params.renderer;
    renderer.outSize = event.params.outSize;
    renderer.additionalMetadataURI = event.params.additionalMetadataURI;
    renderer.save();
  } else {
    throw new Error('Renderer already registered');
  }
}
