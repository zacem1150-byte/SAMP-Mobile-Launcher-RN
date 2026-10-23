import RNFS from 'react-native-fs';
import { unzip, subscribe } from 'react-native-zip-archive';
import { ARCHIVE } from './distribution.service';

const GAME_DIR = RNFS.ExternalDirectoryPath;
const ZIP_PATH = `${RNFS.CachesDirectoryPath}/${ARCHIVE.name}`;
const MARKER = `${GAME_DIR}/.uksamp_v${ARCHIVE.version}`;

export async function isInstalled(): Promise<boolean> {
  return RNFS.exists(MARKER);
}

export async function downloadAndUnzip(
  onProgress: (percent: number, stage: string) => void,
): Promise<void> {
  if (await isInstalled()) {
    onProgress(100, 'Готово');
    return;
  }

  const info = await RNFS.getFSInfo();
  if (info.freeSpace < ARCHIVE.bytes * 2.5) {
    throw new Error('Недостатньо вільного місця (потрібно ~1 ГБ)');
  }

  if (await RNFS.exists(ZIP_PATH)) {
    await RNFS.unlink(ZIP_PATH);
  }

  const job = RNFS.downloadFile({
    fromUrl: ARCHIVE.url,
    toFile: ZIP_PATH,
    progressDivider: 1,
    progressInterval: 500,
    progress: (res) => {
      const p = Math.min(res.bytesWritten / ARCHIVE.bytes, 1);
      onProgress(Math.floor(p * 60), 'Завантаження');
    },
  });
  const result = await job.promise;
  if (result.statusCode !== 200) {
    throw new Error(`Помилка завантаження: HTTP ${result.statusCode}`);
  }

  onProgress(60, 'Перевірка файлу');
  const stat = await RNFS.stat(ZIP_PATH);
  if (Number(stat.size) !== ARCHIVE.bytes) {
    await RNFS.unlink(ZIP_PATH);
    throw new Error('Розмір файлу не збігається, спробуй ще раз');
  }
  const hash = await RNFS.hash(ZIP_PATH, 'sha256');
  if (hash.toLowerCase() !== ARCHIVE.sha256.toLowerCase()) {
    await RNFS.unlink(ZIP_PATH);
    throw new Error('Файл пошкоджений (хеш не збігається)');
  }

  onProgress(65, 'Розпаковка');
  const sub = subscribe(({ progress }) => {
    onProgress(65 + Math.floor(progress * 35), 'Розпаковка');
  });
  try {
    await unzip(ZIP_PATH, GAME_DIR);
  } finally {
    sub.remove();
  }

  await RNFS.unlink(ZIP_PATH);
  await RNFS.writeFile(MARKER, ARCHIVE.version, 'utf8');
  onProgress(100, 'Готово');
}
