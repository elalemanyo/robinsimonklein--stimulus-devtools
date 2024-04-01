(function () {
  function detect() {
    const detector = {
      delay: 1000,
      retry: 10,
    };

    function runDetect() {
      const stimulusDetected = !!window['Stimulus'];

      if (stimulusDetected) {
        window.postMessage(
          {
            key: 'stimulus-devtools:detected',
          },
          '*',
        );
        window['__STIMULUS_DEVTOOLS_DETECTED__'] = true;
        return;
      }

      if (detector.retry > 0) {
        detector.retry--;
        setTimeout(() => {
          runDetect();
        }, detector.delay);
        detector.delay *= 1.5;
      }
    }

    setTimeout(() => {
      runDetect();
    }, 100);
  }

  if (document instanceof HTMLDocument) document.addEventListener('DOMContentLoaded', detect);
})();
