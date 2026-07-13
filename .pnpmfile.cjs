function readPackage(pkg) {
  if (pkg.name === 'esbuild') {
    pkg.pnpm = pkg.pnpm || {};
    pkg.pnpm.allowBuild = true;
  }
  if (pkg.name === 'thread-stream') {
    pkg.pnpm = pkg.pnpm || {};
    pkg.pnpm.allowBuild = true;
  }
  return pkg;
}

module.exports = {
  hooks: {
    readPackage,
  },
};
