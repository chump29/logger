# @postfmly/logger

### Info/error console logger <!-- markdownlint-disable MD001 -->

- Handles primitives and objects

---

![Bun](https://img.shields.io/badge/Bun-~1.3.14-informational?style=plastic&logo=bun "Bun")

![CodeQL](https://github.com/chump29/logger/workflows/CodeQL/badge.svg "CodeQL") &nbsp;
![Coverage](https://img.shields.io/badge/Coverage-100%25-success?style=plastic&logo=jest "Coverage")

![License](https://img.shields.io/github/license/chump29/logger?style=plastic&color=blueviolet&label=License&logo=gplv3 "GPLv3")

---

### Installation

```bash
bun add @postfmly/logger
```

### Use

```ts
import { error, info } from "@postfmly/logger"

info("this", { is: "a" }, ["simple", "test"], null)
error("test", [ "me" ], new Error("foo"), null)
```

---

### Linting

```bash
bun run lint
```

---

### Testing

```bash
# bun
bun run test

# browser
bun run test:browser
```

---

### Building

#### README:

```bash
./docs.sh
```

#### Package:

```bash
./build.sh
```

###### *NOTE: Includes linting, testing, and building README*

---

### Publishing

#### Publish:

```bash
./publish.sh
```

###### *NOTES:*

- ###### *Includes building package*

- ###### *Increments `patch` version in `package.json`*


#### Unpublish:

```bash
# current version
npm unpublish --force

# specific version
npm unpublish @postfmly/logger@[version] --force
```
