// ライブラリ読み込み
const express      = require('express');
const app          = express();
const bodyParser   = require('body-parser');
const googleTrends = require('./google-trends-api.min.js');

//body-parserの設定
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 4000; // port番号を指定


// GET http://localhost:3000/api/v1/
app.get('/google-trends/interest-over-time',function(req,res){
    googleTrends.interestOverTime({keyword: req.query.word, geo: 'JP', startTime: new Date(Date.now() - (100 * (24 * 60 * 60 * 1000))), granularTimeResolution: false})
    .then(function(results){
        res.json(JSON.parse(results));
    })
    .catch(function(err){
    console.error(err);
    });
});

app.get('/google-trends/daily-trends',function(req,res){
    googleTrends.dailyTrends({
        trendDate: new Date('2020-12-10'),
        geo: 'US',
        }, function(err, results) {
        if (err) {
            console.log(err);
        }else{
            res.json({
                message: results
            });
        }
    });
});

//サーバ起動
app.listen(port);
console.log('listen on port ' + port);