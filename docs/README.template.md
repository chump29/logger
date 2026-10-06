# @postfmly/logger

### Info/error/variable console logger <!-- markdownlint-disable MD001 -->

- Handles primitives and objects

---

![Bun](https://img.shields.io/badge/Bun-$_bun-informational?style=plastic&logo=bun "Bun")

![CodeQL](https://github.com/$_user/$_repo/workflows/CodeQL/badge.svg "CodeQL") &nbsp;
![Coverage](https://img.shields.io/badge/Coverage-$_coverage%25-success?style=plastic&logo=jest "Coverage")

![NO AI](https://img.shields.io/badge/NO-AI-orange?style=plastic "NO AI") &nbsp;
![License](https://img.shields.io/github/license/$_user/$_repo?style=plastic&color=blueviolet&label=License&logo=gplv3 "GPLv3") &nbsp; <!-- markdownlint-disable MD013 -->
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
error("test", [ "me" ], new Error("foo"), null)
printVars({ BOOL: false, INT: 1, STR: "secret" }, ["STR"]) // STR will be [REDACTED]
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
