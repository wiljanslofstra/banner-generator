# Banner Generator
Create HTML5 banners for AdWords from given images.

![Example usage](https://github.com/wiljanslofstra/banner-generator-cli/blob/master/example.gif)

## Why
In the past I've been creating HTML5 banners. In the process I noticed the time spent doing the same
task over and over again. Multiple images were designed for [different ad sizes](https://support.google.com/adsense/answer/6002621?hl=en). The images had to be placed in Google Web Designer, tested and exported. Doing this many times, and sometimes multiple times because of sudden changes to the designs causes a lot of wasted time.

This command line interface script makes the process a little bit more pleasant. It will create a production ready zip for AdWords from given images.

There was an added bonus by creating this application. It gave me the opportunity to experiment with Node.JS, command line interfaces and Promises.

## Built with
- [Node.JS](https://nodejs.org/en/)
- [Commander](https://www.npmjs.com/package/commander)
- [DustJS](https://www.npmjs.com/package/dustjs-linkedin)
- [Node-zip](https://www.npmjs.com/package/node-zip)
- [Mocha](http://mochajs.org/)
- [Chai](http://chaijs.com/)

## Usage Node.JS
```bash
npm install banner-generator
```
```javascript
import bannerCreator from 'banner-generator';

bannerCreator({
    outputName: 'test',
    format: '300x250',
    files: ['1.png', '2.png'],
    urls: ['http://www.site1.com/', 'http://www.site2.com/'],
    template: 'swipe-gallery',
    onComplete: () => {},
});
```

## Usage CLI
```bash
npm install banner-generator -g

banner-generator build -s 300x250 -f image1.png,image2.png -u http://www.example.com/
```

## Options CLI
```bash
banner-generator build --help

  Options:
      -h, --help              output usage information
      -s, --size <value>      Format of the banner. e.g. 728x90 (required)
      -f, --files <value>     List of files seperated by commas (required)
      -u, --urls <value>      List of exit urls seperated by commas (required)
      -o, --output <value>    Output filename (default: banners)
      -t, --template <value>  Template name (default: swipe-gallery)
```

## Tests
```bash
npm test
```

## Roadmap
- [ ] Tests for file system actions
- [ ] More templates
- [x] Modify output zip filename
- [ ] More options for things like slideSpeed
- [x] Non-CLI API
