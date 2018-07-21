'use strict';

const MODULE_REQUIRE = 1
    /* built-in */
    , assert = require('assert')

    /* NPM */
    , noda = require('noda')
    
    /* in-package */
    , find = noda.inRequire('lib/find')
    ;

describe('lib/find', () => {
    
    it('strict name', () => {
        let name = 'Allen';
        assert.equal(find({ name }).length, 1);
    });

    it('name with ?', () => {
        let name = 'All??';
        assert(find({ name }).length > 0);
    });
    
    it('name with *', () => {
        let name = 'A*';
        assert(find({ name }).length > 0);
    });
    
});