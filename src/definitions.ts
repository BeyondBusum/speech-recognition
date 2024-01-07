import type { PermissionState, PluginListenerHandle } from "@capacitor/core";

export interface PermissionStatus {
  /**
   * Permission state for speechRecognition alias.
   *
   * On Android it requests/checks RECORD_AUDIO permission
   *
   * On iOS it requests/checks the speech recognition and microphone permissions.
   *
   * @since 5.0.0
   */
  speechRecognition: PermissionState;
}

export interface SpeechRecognitionPlugin {
  /**
   * This method will check if speech recognition feature is available on the device.
   * @param none
   * @returns available - boolean true/false for availability
   */
  available(): Promise<{ available: boolean }>;
  /**
   * This method will start to listen for utterance.
   *
   * if `partialResults` is `true`, the function respond directly without result and
   * event `partialResults` will be emit for each partial result, until stopped.
   *
   * @param options
   * @returns void or array of string results
   */
  start(options?: UtteranceOptions): Promise<{ matches?: string[] }>;

  processFile(_options: ProcessFileOptions): Promise<{ matches?: string[] }>;
  /**
   * This method will stop listening for utterance
   * @param none
   * @returns void
   */
  stop(): Promise<void>;
  /**
   * This method will return list of languages supported by the speech recognizer.
   *
   * It's not available on Android 13 and newer.
   *
   * @param none
   * @returns languages - array string of languages
   */
  getSupportedLanguages(): Promise<{ languages: any[] }>;
  /**
   * This method will check for audio permissions.
   * @param none
   * @returns permission - boolean true/false if permissions are granted
   *
   * @deprecated use `checkPermissions()`
   */
  hasPermission(): Promise<{ permission: boolean }>;
  /**
   * This method will prompt the user for audio permission.
   * @param none
   * @returns void
   *
   * @deprecated use `requestPermissions()`
   */
  requestPermission(): Promise<void>;
  /**
   * Check the speech recognition permission.
   *
   * @since 5.0.0
   */
  checkPermissions(): Promise<PermissionStatus>;
  /**
   * Request the speech recognition permission.
   *
   * @since 5.0.0
   */
  requestPermissions(): Promise<PermissionStatus>;
  /**
   * Called when partialResults set to true and result received.
   *
   * On Android it doesn't work if popup is true.
   *
   * Provides partial result.
   *
   * @since 2.0.2
   */
  addListener(
    eventName: "partialResults",
    listenerFunc: (data: { matches: string[] }) => void
  ): Promise<PluginListenerHandle> & PluginListenerHandle;
  /**
   * Remove all the listeners that are attached to this plugin.
   *
   * @since 4.0.0
   */
  removeAllListeners(): Promise<void>;
}

export interface UtteranceOptions {
  /**
   * key returned from `getSupportedLanguages()`
   */
  language?: string;
  /**
   * maximum number of results to return (5 is max)
   */
  maxResults?: number;
  /**
   * prompt message to display on popup (Android only)
   */
  prompt?: string;
  /**
   * display popup window when listening for utterance (Android only)
   */
  popup?: boolean;
  /**
   * return partial results if found
   */
  partialResults?: boolean;
}

export interface ProcessFileOptions {
  /**
   * key returned from `getSupportedLanguages()`
   */
  language?: string;
  /**
   * maximum number of results to return (5 is max)
   */
  maxResults?: number;

  /**
   * path to file
   */
  file: string;
}
