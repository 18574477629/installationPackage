const build = require('../lib')
if(process.argv.length !== 4) {
    console.log('参数不正确');
} else {
    global.__dirname = __dirname;
    build(process.argv[2], process.argv[3]);
}