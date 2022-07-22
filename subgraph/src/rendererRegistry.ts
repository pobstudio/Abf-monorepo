import { dataSource, DataSourceContext } from '@graphprotocol/graph-ts';
import { RegisteredRenderer } from '../generated/RendererRegistry/RendererRegistry';
import { Renderer } from '../generated/schema';
import { Renderer as RendererTemplate } from '../generated/templates';
import {
  OwnershipTransferred,
  Renderer as RendererContract,
} from '../generated/templates/Renderer/Renderer';

export function handleRegisteredRenderer(event: RegisteredRenderer): void {
  let renderer = Renderer.load(event.params.id.toHexString());
  if (renderer == null) {
    renderer = new Renderer(event.params.id.toHexString());
  }
  const rendererContract = RendererContract.bind(event.params.renderer);

  renderer.address = event.params.renderer;
  renderer.propsSize = event.params.propsSize;
  renderer.additionalMetadataURI = event.params.additionalMetadataURI;
  renderer.registeredAt = event.block.timestamp;
  renderer.owner = rendererContract.owner();
  renderer.name = rendererContract.name();
  renderer.save();
  let context = new DataSourceContext();
  context.setString('id', event.params.id.toHexString());
  RendererTemplate.create(event.params.renderer);
}

export function handleRendererOwnershipTransferred(
  event: OwnershipTransferred,
): void {
  let renderer = Renderer.load(dataSource.context().getString('id'));
  if (renderer == null) {
    throw new Error('Renderer not registered');
  }
  renderer.owner = event.params.newOwner;
  renderer.save();
}
