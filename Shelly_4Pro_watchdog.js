let SETTINGS = {
  urls: [
    "https://global.gcping.com/ping",
    "https://us-central1-5tkroniexa-uc.a.run.app/ping",
  ],
  maxFails: 3, // Number of failures that trigger the reset
  requestTimeout: 10, // Timeout in seconds for the HTTP request
  checkInterval: 60, // Time in seconds to retry a "ping"
  maxRetries: 3 // Maximum retries per endpoint before counting as a failure
};

let currentEndpoint = 0;
let failureCount = 0;
let retryCount = 0;
let checkTimer = null;

function logMessage(message) {
  print("[Watchdog] " + message);
}

function handleError(response, error_code, error_message) {
  if (error_code === -114 || error_code === -104) {
    logMessage("Timeout fetching " + SETTINGS.urls[currentEndpoint]);
  } else {
    logMessage("Error fetching " + SETTINGS.urls[currentEndpoint] + ": " + error_message);
  }
}

function resetDevice() {
  logMessage("Too many fails, resetting device...");
  failureCount = 0;
  Timer.clear(checkTimer);
  Shelly.call("Shelly.Reboot");
}

function nextEndpoint() {
  currentEndpoint = (currentEndpoint + 1) % SETTINGS.urls.length;
  retryCount = 0;
}

function pingEndpoint() {
  Shelly.call(
    "http.get",
    { url: SETTINGS.urls[currentEndpoint], timeout: SETTINGS.requestTimeout },
    function (response, error_code, error_message) {
      if (error_code !== 0) {
        handleError(response, error_code, error_message);
        retryCount++;
        if (retryCount < SETTINGS.maxRetries) {
          logMessage("Retrying... (" + retryCount + "/" + SETTINGS.maxRetries + ")");
          pingEndpoint();
        } else {
          failureCount++;
          logMessage("Rotating through endpoints");
          nextEndpoint();
        }
      } else {
        logMessage("Success fetching " + SETTINGS.urls[currentEndpoint]);
        failureCount = 0;
        retryCount = 0;
        nextEndpoint();
      }

      if (failureCount >= SETTINGS.maxFails) {
        resetDevice();
      }
    }
  );
}

function startWatchdog() {
  logMessage("Starting connectivity watchdog");
  checkTimer = Timer.set(SETTINGS.checkInterval * 1000, true, pingEndpoint);
}

startWatchdog();
