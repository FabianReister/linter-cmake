'use babel';

import {
  exec,
  generateRange
} from 'atom-linter';

import {
  TextEditor
} from 'atom';

module.exports = {
  activate() {},

  provideLinter() {
    return {
      name: 'cmake',
      grammarScopes: ['source.cmake'],
      scope: 'project',
      lintsOnChange: false,
      lint: (textEditor) => {
        // setup variables
        const lint_regex = /(.*)CMakeLists.txt:(\d+):(.*)/;
        const filePath = textEditor.getPath();
        const correct_file = new RegExp(filePath);

        var cmakeLintExecutable = atom.config.get('linter-cmake.cmakeLintExecutablePath');

        return exec(cmakeLintExecutable, [filePath], {
          cwd: require('path').dirname(filePath),
          ignoreExitCode: true,
          throwOnStderr: false
        }).then(output => {
          const lines = output.split('\n');

          // initialize variable for linter return here for either linter output or errors
          var messages = [];

          lines.forEach(function(line) {
            const lint_matches = lint_regex.exec(line);

            if (lint_matches == null) {
              return;
            }

            // start line counting at 0
            lint_matches[2] = lint_matches[2] > 0 ? lint_matches[2] - 1 : 0;

            // alias for array fields
            const linePosition = Number.parseInt(lint_matches[2], 0);
            const description = lint_matches[3];

            messages.push({
              severity: 'warning',
              excerpt: description,
              location: {
                file: filePath,
                position: generateRange(textEditor, linePosition),
              },
              version: 2
            });
          });
          return messages;
        }).catch(error => {
          console.log(error);
          return [];
        });
      }
    };
  }
};