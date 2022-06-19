export const IPFS_CID_CACHE: { [cid: string]: any } = {
  bafkreia3wfctuvolqks25cpbk4ddqcmtrogpmtkmr2vmmttepswnjymvza: `{
    "description": "A 8 by 8 RGB pixel renderer. Provide 64 tuples of 3 bytes (R, G, B) in a continous hex string.",
    "previewOptions": {
    "groupBytesIn": 3,
    "skipBytesBeforeGrouping": 0
    }
  }`,
  bafkreibmk2xdb6dlacgfic6g2zsz6vjlep4j5klctflwopl62hqpxvn3ii: `{"description":"A 16 by 16 dot matrix. Provide 256 bytes to control the radius of each dot. Larger the byte, the larger the relative radius.","previewOptions":{"groupBytesIn":1,"skipBytesBeforeGrouping":0}}`,
  bafkreifhpchsv7gjyllzmacwor7logavr5wvu2d66onq6sdjtuyrbg6ntq: `{"description":"A 8 by 8 mono-chrome pixel grid. Provide 256 bytes to control the gray hue. 0x00 is black, 0xFF is white.","previewOptions":{"groupBytesIn":1,"skipBytesBeforeGrouping":0}}`,
};
