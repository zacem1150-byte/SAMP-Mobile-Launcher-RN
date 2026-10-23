import { CacheType } from '../actions/loaderActions';

export const DistributionService = {
  async get(): Promise<DistributionResponseType> {
    return {
      cdnLauncher: '',
      cdnCache: '',
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
