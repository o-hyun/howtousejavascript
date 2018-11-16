const {expect, assert} = require('chai');

describe('ArrayBufferTest', () => {
    // ArrayBuffer.isView()
    describe('ArrayBuffer.isView test', () => {
        var buffer;
        before(() => {
            buffer = new ArrayBuffer(16);
        });
        it('ArrayBuffer의 View인지를 체크한다.', function () {
            assert(ArrayBuffer.isView(new Int32Array(buffer)));
        });
        it('ArrayBuffer 자체는 View가 아님', () => {
            assert.isFalse(ArrayBuffer.isView(buffer));
        });
        it('물론 배열도 불가능', () => {
            assert.isFalse(ArrayBuffer.isView([]));
        });
    });

    // arraybuffer.slice(begin[, end])
    describe('ArrayBuffer.prototype.slice test', () => {
        let buffer;
        before(() => {
            buffer = new ArrayBuffer(16);        // 16 바이트 버퍼를 만들어서
        });
        it('int32View는 4바이트짜리 정수형 뷰이기 때문에 16바이트 버퍼를 담으면 4개의 정수 배열이여야 한다.', function () {
            let int32View = new Int32Array(buffer);  // 4바이트짜리 int형 배열 뷰를 만든다.
            expect(Array.from(int32View)).to.eql([0, 0, 0, 0]);
        });
        it('buffer를 slice로 첫 바이트, 마지막 바이트를 날리면 2개의 정수 배열이 되야 한다.', function () {
            let int32View = new Int32Array(buffer.slice(4, 12));
            expect(Array.from(int32View)).to.eql([0, 0]);
            int32View[1] = 42;
            expect(Array.from(int32View)).to.eql([0, 42]);
            expect(int32View[1]).to.eql(42);
        });
    });
    // ArrayBuffer.transfer(oldBuffer [, newByteLength]);
    // 현재 드래프트 중임 (지원되는 브라우저 X)
    describe.skip('ArrayBuffer.transfer test', () => {
        it('transfer()는 바이트 배열이 복사되지 않고 원 소스를 그대로 공유한다.', function () {
            let buf1 = new ArrayBuffer(40);
            new Int32Array(buf1)[0] = 42;
            assert(buf1.byteLength === 40);

            let buf2 = ArrayBuffer.transfer(buf1, 80);
            assert(buf2.byteLength === 80);
        });
    });
});

