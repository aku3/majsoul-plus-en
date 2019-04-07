import * as fs from 'fs';
import * as path from 'path';

import { fillObject } from './utils-refactor';
import { majsoulPlusGlobal } from './global';
import { ServerOptions } from 'https';

/**
 * 默认配置
 */
const defaultWindowConfig: MajsoulPlus.UserWindowConfig = {
  OSTheme: 'light',
  gameWindowSize: '',
  zoomFactor: 1,
  renderingMultiple: 100,
  isKioskModeOn: false,
  isNoBorder: false,
  isManagerHide: false
};

const defaultUpdateConfig: MajsoulPlus.UserUpdateConfig = {
  prerelease: false
};

const defaultChromiumConfig: MajsoulPlus.UserChromiumConfig = {
  isHardwareAccelerationDisable: false,
  isInProcessGpuOn: true,
  isIgnoreGpuBlacklist: false
};

const defaultUserDataConfig: MajsoulPlus.UserDataConfig = {
  useAppdataLibrary: false
};

export const defaultConfig: MajsoulPlus.UserConfig = {
  window: defaultWindowConfig,
  update: defaultUpdateConfig,
  chromium: defaultChromiumConfig,
  userData: defaultUserDataConfig
};

export const serverOptions: ServerOptions = {
  key: fs.readFileSync(path.join(__dirname, 'certificate/key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'certificate/cert.crt'))
};

/**
 * 冻结对象使其不可更改
 */
Object.freeze(defaultWindowConfig);
Object.freeze(defaultUpdateConfig);
Object.freeze(defaultChromiumConfig);
Object.freeze(defaultUserDataConfig);
Object.freeze(defaultConfig);
Object.freeze(serverOptions);

/**
 * 加载配置文件 json
 */
export function LoadConfigJson(): MajsoulPlus.UserConfig {
  let config: MajsoulPlus.UserConfig;
  try {
    config = JSON.parse(
      fs.readFileSync(majsoulPlusGlobal.UserConfigPath, {
        encoding: 'utf-8'
      })
    );
  } catch (e) {
    config = fillObject({}, defaultConfig) as MajsoulPlus.UserConfig;
  }
  return config;
}
