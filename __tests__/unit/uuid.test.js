const uuid =  require('../../src/utils/uuid')

describe('Test function uuid generation', () => {

    it('should generate uuid for entities  database  ', () => {
        const id = uuid()
        expect(typeof id).toBe('string')
        
    });
    
});