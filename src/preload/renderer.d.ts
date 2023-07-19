import { contextApi } from './preload'

declare global {
    interface Window {
        api: typeof contextApi
    }
}
