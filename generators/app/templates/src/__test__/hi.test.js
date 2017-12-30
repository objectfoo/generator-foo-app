const hi = require('../../');

describe('stuff', () => {
	test('some stuff', () => {
		const result = hi();
		expect(result).toEqual('hi');
	});
});
