var argv = require('yargs')
    .command('addcity', 'Greets the user', function (yargs) {
        yargs.options({
            city: {
                demand: true,
                alias: 'c',
                description: 'Your city name goes here',
                type: 'string'
            },
            country: {
                demand: true,
                alias: 'ct',
                description: 'Your country name goes here',
                type: 'string'
            }
        }).help('help');
    })
    
    .help('help')
    .argv;
var command = argv._[0];

console.log(argv);

if (command === 'addcity' && typeof argv.city !== 'undefind' && typeof argv.country !== 'undefined') {
    console.log('You are in  ' + argv.city + ' ' + argv.country + '!');  
} else if (command === 'addcity' && typeof argv.city !== 'undefined') {
    console.log('You are in  ' + argv.city + '!');
} else if (command === 'addcity') {
    console.log('Hello world!');
}