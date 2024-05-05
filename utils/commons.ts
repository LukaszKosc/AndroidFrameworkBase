import { spawnSync } from 'node:child_process';

export const pages = {
  'products': {
    'title': 'Swag Labs',
    'section': 'Products'
  },
  'productdetail': {
    'title': 'Swag Labs',
    'section': 'ProductDetails'
  }
}
export enum AppState {
  UNDETERMINED_STATE = 0,
  NOT_RUNNING = 1,
  RUNNING_IN_BACKGROUND_SUSPENDED = 2,
  RUNNING_IN_FOREGROUND_NOT_SUSPENDED = 3,
  RUNNING_IN_FOREGROUND = 4
}

export async function sleep(ms: number) { return new Promise(resolve => setTimeout(resolve, ms)); }
