var model = new falcor.Model({
  source: new falcor.HttpDataSource('/model')
});

model.getValue('token').then(function (res) {
  console.log('get token = %s', res);
});

$.post('/auth', function () {
  model.getValue('token').then(function (res) {
    console.log('get token = %s after post /auth', res);
  });
});
