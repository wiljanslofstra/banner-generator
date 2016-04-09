# Banner Generator CLI
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

## Installation
```bash
npm install banner-generator-cli -g
```

## Usage
```bash
banner-generator build -s 300x250 -f image1.png,image2.png -u http://www.example.com/
```

## Options
```bash
banner-generator build --help

  Options:
    -h, --help           output usage information
    -s, --size <value>   Format of the banner. e.g. 728x90 (required)
    -f, --files <value>  List of files seperated by commas (required)
    -u, --urls <value>   List of exit urls seperated by commas (required)
```

## Roadmap
- [ ] Tests
- [ ] More templates
- [ ] Modify output zip filename
- [ ] More options for things like slideSpeed
- [ ] Non-CLI API
