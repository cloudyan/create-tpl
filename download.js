const fs = require('fs');
const download = require('download');

// tar -zcvf <yourname>.tar.gz <yourpath>
// https://qastack.cn/programming/15035786/download-source-from-npm-without-installing-it
// npm view [package name] dist.tarball
// npm pack <package's name>
// npm v XXX dist.tarball | xargs curl | tar -xz
// npm view create-tpl@0.0.9 dist.tarball
// https://www.jianshu.com/p/5f2f3754cda1
//
(async () => {
  await download('http://pic.jj20.com/up/allimg/911/100416110525/161004110525-20.jpg', 'dist');

  fs.writeFileSync('dist/1.jpg', await download('http://pic.jj20.com/up/allimg/911/100416110525/161004110525-20.jpg'));

  // download('http://pic.jj20.com/up/allimg/911/100416110525/161004110525-20.jpg').pipe(fs.createWriteStream('dist/foo.jpg'));

  await Promise.all([
    'http://pic.jj20.com/up/allimg/911/100416110525/161004110525-20.jpg',
    // 'cats.com/dancing.gif'
  ].map(url => download(url, 'dist/a/')));
})();
