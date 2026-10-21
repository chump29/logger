# @postfmly/logger

### Info/error/variable console logger <!-- markdownlint-disable MD001 -->

- Handles primitives and objects

###### NOTE: `printVars()` supports: `string`, `number`, `boolean`, `Date`, `string[]`

---

![Bun](https://img.shields.io/badge/Bun-1.4.3-informational?style=plastic&logo=bun "Bun")

![CodeQL](https://github.com/chump29/logger/workflows/CodeQL/badge.svg "CodeQL") &nbsp;
![Coverage](https://img.shields.io/badge/Coverage-98.85%25-success?style=plastic&logo=jest "Coverage")

![NO AI](https://img.shields.io/badge/NO-AI-orange?style=plastic "NO AI") &nbsp;
![License](https://img.shields.io/github/license/chump29/logger?style=plastic&color=blueviolet&label=License&logo=gplv3 "GPLv3") &nbsp; <!-- markdownlint-disable MD013 -->
![CVE Scan](https://img.shields.io/badge/CVE%20Scan-Pass-success?style=plastic&logo=owasp "CVE Scan")

---

### Installation

```bash
bun add @postfmly/logger
```

### Use

```ts
import { error, info } from "@postfmly/logger"

info("this", { is: "a" }, ["simple", "test"], null)

error("test", ["me"], new Error("foo"), null)

printVars({ ARR: ["foo", "bar"], BLANK: "", BOOL: false, COLOR: "#c0ffee", NOW: new Date(), NUM: 123, SECRET: "!" }, [
  "SECRET"
])
// BLANK will be [BLANK], STR will be [REDACTED]
```

---

### Linting

```bash
bun run lint
```

---

### Testing

```bash
# tests only
bun run test

# tests only, verbose
bun run test:full

# with coverage
bun run test:coverage

# with coverage, verbose
bun run test:coverage:full
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

###### _NOTE: Includes linting, testing, and building README_

---

### Publishing

#### Publish:

```bash
./publish.sh
```

###### _NOTES:_

- ###### _Includes building package_

- ###### _Increments `patch` version in `package.json`_

#### Unpublish:

```bash
# current version
npm unpublish --force

# specific version
npm unpublish @postfmly/logger@[version] --force
```
