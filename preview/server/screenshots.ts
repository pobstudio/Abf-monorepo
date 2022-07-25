import { launch, Page } from 'puppeteer-core';
import {
  DIMENSIONS,
  FILE_TYPE,
  RENDER_URL,
  SCREENSHOT_QUALITY,
} from './constants';
import { getOptions } from './options';
import { FileType } from './types';

let _page: Page | null;
const IS_DEV = !process.env.AWS_REGION;

async function getPage(isDev: boolean) {
  if (_page) {
    return _page;
  }
  const options = await getOptions(isDev);
  const browser = await launch(options);
  _page = await browser.newPage();
  return _page;
}

export async function getScreenshot(
  route: string,
  type: FileType = FILE_TYPE,
  quality: number = SCREENSHOT_QUALITY,
  dimensions: [number, number] = DIMENSIONS,
  isDev: boolean = IS_DEV,
) {
  const page = await getPage(isDev);
  await page.setViewport({
    width: dimensions[0],
    height: dimensions[1],
  });
  await page.goto(route);
  console.log(route);
  const file = await page.screenshot({ type, quality });
  return file as Buffer;
}

export async function getArtScreenshot(output: string, renderer: string) {
  return await getScreenshot(
    `${RENDER_URL}/render?output=${output}&renderer=${renderer}`,
  );
}
