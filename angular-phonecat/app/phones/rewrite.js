var fs = require('fs');

var phones = JSON.parse(fs.readFileSync('./list/phones.json', {"encoding": "utf-8"}));

fs.readdir('./detailed', function(err, files) {

    files.forEach(function(file) {
        var detailed = JSON.parse(fs.readFileSync('./detailed/'+file, {"encoding": "utf-8"}));
        phones = phones.map(function(phone) {
            if (phone.id === detailed.id) {
                phone.camera = detailed.camera.primary;
            }
            return phone;
        });

    });


    fs.writeFile('./phones.json', JSON.stringify(phones, null, 4), function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log('done')
        }
    });


});
