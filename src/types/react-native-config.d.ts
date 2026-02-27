declare module 'react-native-config' {
  interface NativeConfig {
    API_BASE_URL?: string;
    API_VERSION?: string;
    REQUEST_TIMER?: string;
    [key: string]: string | undefined;
  }

  const Config: NativeConfig;
  export default Config;
}
