(() => {
  'use strict';
  
  module.exports = function setup(options, imports, register) {

    const Cassandra = require('express-cassandra');
    const models = Cassandra.createClient({
      clientOptions: {
        contactPoints: options.contactPoints || ['127.0.0.1'],
        protocolOptions: { 
          port: options.port || 9042
        },
        keyspace: options.keyscape,
        queryOptions: {
          consistency: options.consistency || Cassandra.consistencies.one
        }
      },
      ormOptions: {
        defaultReplicationStrategy : {
          class: 'SimpleStrategy',
          replication_factor: 1
        },
        migration: 'safe',
        createKeyspace: true
      }
    });
    
    models.connect(function (err) {
      if (err) throw err;
      
      register(null, {
        'cassandra': models
      });
   
    });

  };
})();