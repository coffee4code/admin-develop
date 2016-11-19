'use strict';
define(['application'], function (application) {
    describe('when the app starts', function () {
        it('outputs \'Apple Started!\' in the target', function () {
            var a = application.bootstrap();
            expect(a).toEqual(undefined);
        });
    });
});
