# linter-cmake

This linter plugin for [Linter](https://github.com/AtomLinter/Linter) provides
an interface to [cmake-lint](https://github.com/richq/cmake-lint). It will be used
with files that have the "CMake" syntax.

## Installation

As this plugin is based on cmake-lint, you have to install it e.g.

    pip install cmakelint

### Plugin installation

```ShellSession
apm install linter-cmake
```

## Contribution

You are welcome to contribute. The implementation is currently as simple as it can be.



If you find some bugs, please report them (https://github.com/FabianReister/linter-cmake/issues).

## Wish lish

 - [ ] config file support
 - [ ] filter support (black- and whitelist)

Although direct config file support is not implemented, you can use the file `~/.config/cmakelintrc` to configure cmake-lint.

## Acknowledgement

Thanks to the authors of the 'linter-ansible-linting' and 'linter-jshint' as these Atom plugins have been inspiring.
