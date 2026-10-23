import { CacheType } from '../actions/loaderActions';

const RELEASE_URL = 'https://github.com/zacem1150-byte/launcher/releases/download/v1';

export const ARCHIVE = {
  name: 'uksamp.zip',
  url: `${RELEASE_URL}/uksamp.zip`,
  version: '1',
  bytes: 413872146,
  sha256: 'b4baa4ca701e22d14d043e3c11dac29df712c7f6f14f04df00fb06fca24d41f4',
};

export const DistributionService = {
  async get(): Promise<DistributionResponseType> {
    return {
      cdnLauncher: RELEASE_URL,
      cdnCache: RELEASE_URL,
      cacheMode: [],
      cache: [],
      rss: '',
      versionHash: '1',
      packageName: 'com.touch.mobile.dark',
      projectName: 'Touch Mobile Dark',
      servers: [
        {
          id: 1,
          show: true,
          version: '0.3.7',
          icon: '',
          events: [],
          slot: 1000,
          bonus: false,
          name: 'UKRAINE-SAMP',
          description: 'UK SAMP SUPER',
          address: '188.165.192.24:6922',
          sampVersion: '0.3.7',
        },
      ],
      launcher: {
        appVersion: '0.0.16',
        name: 'launcher.apk',
        hash: '',
        bytes: 0,
        size: '0 MB',
      },
      filesContinue: [],
    };
  },
};

type DistributionResponseType = DistributionResponse & {
  cache: CacheType[];
};

export type DistributionResponse = {
  cdnLauncher: string;
  cdnCache: string;
  cacheMode: CacheType[];
  rss: string;
  versionHash: string;
  packageName: string;
  projectName: string;
  servers: ServerType[];
  launcher: LauncherType;
  filesContinue: FileContinueType;
};

type FileContinueType = string[];

type LauncherType = {
  appVersion: string;
  name: string;
  hash: string;
  bytes: number;
  size: string;
};

type EventType = {
  title: string;
  style: 'red' | 'blue';
};

export type ServerType = {
  id: number;
  show: boolean;
  version: string;
  icon: string;
  events: EventType[];
  slot: number;
  bonus: boolean;
  name: string;
  description: string;
  address: string;
  sampVersion: string;
};
