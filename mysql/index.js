var mysql      = require('mysql');
var pool = mysql.createPool({
  host     : 'cd-cdb-2n4ah3sb.sql.tencentcdb.com',
  port     : '63884',
  user     : 'root',
  password : 'yzmloveshy1993',
  database : 'weijian'
});
 
let query = function( sql, values ) {
  // 返回一个 Promise
  return new Promise(( resolve, reject ) => {
    pool.getConnection(function(err, connection) {
      if (err) {
        reject( err )
      } else {
        connection.query(sql, values, ( err, rows) => {

          if ( err ) {
            console.log(err)
            reject( err )
          } else {
            resolve( rows )
          }
          // 结束会话
          connection.release()
        })
      }
    })
  })
}

module.exports =  query