// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
  const executeScripts = (tabId, scripts) => {
    return new Promise((resolve, reject) => {
      try {
        if (scripts.length && scripts.length > 0) {
          const execute = (index = 0) => {
            chrome.tabs.executeScript(tabId, scripts[index], () => {
              const newIndex = index + 1;
              if (scripts[newIndex]) {
                execute(newIndex);
              } else {
                resolve();
              }
            });
          }
          execute();
        } else {
          throw new Error('scripts(array) undefined or empty');
        }
      } catch (err) {
        reject(err);
      }
    });
  };

  executeScripts(null, [
      { file: "common/jquery-3.3.1.min.js" }, 
      { file: "common/commonUtils.js" },
      { file: "common/tooltip.js" },
      { file: "biz/helpGuide.js" },
      { code: "loadPage()" }
  ]).then(() => {
    console.log('Script loading sucessfully');
  })
});