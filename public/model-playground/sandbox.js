/* global BABYLON */

var hostElement = document.getElementById('host-element');

const fallbackUrl = 'https://babylonsnapshots.z22.web.core.windows.net/refs/heads/master';

let loadScriptAsync = function(url, instantResolve) {
  return new Promise((resolve) => {
    // eslint-disable-next-line no-undef
    let urlToLoad =
      typeof globalThis !== 'undefined' && globalThis.__babylonSnapshotTimestamp__
        ? url + '?t=' + globalThis.__babylonSnapshotTimestamp__
        : url;
    const script = document.createElement('script');
    script.src = urlToLoad;
    script.onload = () => {
      if (!instantResolve) {
        resolve();
      }
    };
    script.onerror = () => {
      // fallback
      const fallbackScript = document.createElement('script');
      fallbackScript.src = url.replace('https://preview.babylonjs.com', fallbackUrl);
      fallbackScript.onload = () => {
        if (!instantResolve) {
          resolve();
        }
      };
      document.head.appendChild(fallbackScript);
    };
    document.head.appendChild(script);
    if (instantResolve) {
      resolve();
    }
  });
};

const Versions = {
  dist: [
    'https://preview.babylonjs.com/timestamp.js?t=' + Date.now(),
    'https://preview.babylonjs.com/babylon.js',
    'https://preview.babylonjs.com/loaders/babylonjs.loaders.min.js',
    'https://preview.babylonjs.com/serializers/babylonjs.serializers.min.js',
    'https://preview.babylonjs.com/materialsLibrary/babylonjs.materials.min.js',
    'https://preview.babylonjs.com/gui/babylon.gui.min.js',
    'https://preview.babylonjs.com/inspector/babylon.inspector.bundle.js',
  ],
  local: [
    './model-playground/babylonjs/timestamp.js?t=' + Date.now(),
    './model-playground/babylonjs/babylon.js',
    './model-playground/babylonjs/babylonjs.loaders.min.js',
    './model-playground/babylonjs/babylonjs.serializers.min.js',
    './model-playground/babylonjs/babylonjs.materials.min.js',
    './model-playground/babylonjs/babylon.gui.min.js',
    './model-playground/babylonjs/babylon.inspector.bundle.js',
  ],
};

let loadInSequence = async function(versions, index, resolve) {
  if (index >= versions.length) {
    resolve();
    return;
  }
  await loadScriptAsync(versions[index], index > 2);
  loadInSequence(versions, index + 1, resolve);
};

let checkBabylonVersionAsync = function() {
  let activeVersion = 'dist';

  if (window.location.hostname === 'localhost' && window.location.search.indexOf('dist') === -1) {
    activeVersion = 'local';
  }

  let snapshot = '';
  // see if a snapshot should be used
  if (window.location.search.indexOf('snapshot=') !== -1) {
    snapshot = window.location.search.split('=')[1];
    // cleanup, just in case
    snapshot = snapshot.split('&')[0];
    activeVersion = 'dist';
  }

  let versions = Versions[activeVersion] || Versions['dist'];
  if (snapshot && activeVersion === 'dist') {
    versions = versions.map((v) =>
      v.replace(
        'https://preview.babylonjs.com',
        'https://babylonsnapshots.z22.web.core.windows.net/' + snapshot
      )
    );
  }

  return new Promise((resolve, _reject) => {
    loadInSequence(versions, 0, resolve);
  });
};

checkBabylonVersionAsync().then(() => {
  loadScriptAsync('./model-playground/jsviewer.js').then((scene) => {
    BABYLON.Sandbox.Show(hostElement);
  });
});
