# @postfmly/logger

> - Info/error console logger

---

![Biome](https://img.shields.io/badge/Biome-^2.4.15-informational?style=plastic&logo=biome) &nbsp;
![Bun](https://img.shields.io/badge/Bun-~1.3.13-informational?style=plastic&logo=bun)

![CodeQL](https://github.com/chump29/logger/workflows/CodeQL/badge.svg) &nbsp;
![Coverage](https://img.shields.io/badge/Coverage-100%25-success?style=plastic&logo=jest)

![License](https://img.shields.io/github/license/chump29/logger?style=plastic&color=blueviolet&label=License&logo=gplv3)

---

### Installation <!-- markdownlint-disable MD001 -->

```bash
bun add @postfmly/logger
```

### Use

```ts
import { error, info } from "@postfmly/logger"

info("this", { is: "a" }, ["simple", "test"])
error("error text", new Error("foo"))
```

---

### Building

```bash
bun run build
```

---

### Testing

```bash
bun run test
```

---

### Publishing

#### Publish:

```bash
./publish.sh
```

#### Unpublish:

```bash
# current version
npm unpublish --force

# specific version
npm unpublish @postfmly/logger@[version] --force
```
