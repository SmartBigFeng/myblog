/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
declare module 'vue-aplayer';
declare module 'particles.js'
declare module '*.json' {
  const value: any;
  export default value;
}