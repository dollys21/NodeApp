var argv = require('yargs')
    .command('adduser', 'Greets the user', function (yargs) {
        yargs.options({
            name: {
                demand: true,
                alias: 'n',
                description: 'Your first name goes here',
                type: 'string'
            },
            lastname: {
                demand: true,
                alias: 'l',
                description: 'Your last name goes here',
                type: 'string'
            }
        }).help('help');
    })
    .command('getuser', ' user details', function (yargs) {
        yargs.options({
            department: {
                demand: true,
                alias: 'd',
                description: 'Your department name goes here',
                type: 'string'
            },
            email: {
                demand: true,
                alias: 'e',
                description: 'Your email goes here',
                type: 'string'
            }
        }).help('help');
    })
    
    .help('help')
    .argv;
var command = argv._[0];

console.log(argv);

if (command === 'adduser' && typeof argv.name !== 'undefind' && typeof argv.lastname !== 'undefined' && command === 'getuser' && typeof argv.department !== 'undefind' && typeof argv.email !== 'undefined') {
    console.log('Hello ' + argv.name + ' ' + argv.lastname + '!' + argv.department + ' ' + argv.email + '. ');  
} else if (command === 'adduser' && typeof argv.name !== 'undefined') {
    console.log('Hello ' + argv.name + '!');
} else if (command === 'adduser') {
    console.log('Hello world!');
}