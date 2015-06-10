var fs = require('fs');

var phones = JSON.parse(fs.readFileSync('phones.json', {"encoding": "utf-8"}));

fs.readdir('./detailed', function(err, files) {

    files.forEach(function(file) {
        var detailed = JSON.parse(fs.readFileSync('./new/'+file, {"encoding": "utf-8"}));
        phones = phones.map(function(phone) {
            if (phone.id === detailed.id) {
                phone.price = detailed.price;
            }
            return phone;
        });

    });


    fs.writeFile('./new.json', JSON.stringify(phones, null, 4), function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log('done')
        }
    });


});
