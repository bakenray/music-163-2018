{
    let APP_ID = 'Mzp86B4O2fUbFGapQ00A7Rd5-gzGzoHsz';
    let APP_KEY = 'jdtjNWGeK7hszBNXkmpSAAKR';

    AV.init({
      appId: APP_ID,
      appKey: APP_KEY
    });
}

        // // 创建数据库
        // var TestObject = AV.Object.extend('Playlist');
        // // 创建一条记录
        // var testObject = new TestObject();
        // // 保存记录
        // testObject.save({
        //   name: 'test',
        //   cover:'test',
        //   creatorId:'test',
        //   description:'test',
        //   songs:['1','2']
        // }).then(function(object) {
        //   alert('LeanCloud Rocks!');
        // },()=>{alert('fuck')})