"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.$varint_decode_i32 = $varint_decode_i32;
exports.$varint_decode_u32 = $varint_decode_u32;
exports.$varint_decode_i64 = $varint_decode_i64;
exports.$varint_decode_u64 = $varint_decode_u64;
exports.$varint_encode = $varint_encode;
function EncodeVarNumber(dst, offset, value) {
    value = (value | 0) >>> 0; // 32-bit integer
    while (value > 127) {
        dst[offset++] = (value & 127) | 128;
        value >>>= 7;
    }
    dst[offset++] = value;
    return offset;
}
function DecodeVarNumber(buf, offset) {
    var value = 0;
    var shift = 0;
    while (true) {
        var byte = buf[offset++];
        value |= (byte & 127) << shift;
        if (byte < 128) {
            break;
        }
        shift += 7;
    }
    return [value | 0, offset];
}
function DecodeVarBigInt(buf, offset) {
    var value = BigInt(0);
    var shift = BigInt(0);
    while (true) {
        var byte = buf[offset++];
        value |= BigInt(byte & 127) << shift;
        if (byte < 128) {
            break;
        }
        shift += BigInt(7);
    }
    return [BigInt.asIntN(64, value), offset];
}
function $varint_decode_i32(buf, offset) {
    var _a = __read(DecodeVarNumber(buf, offset), 2), v = _a[0], o = _a[1];
    return [v, o];
}
function $varint_decode_u32(buf, offset) {
    var _a = __read(DecodeVarNumber(buf, offset), 2), v = _a[0], o = _a[1];
    return [v >>> 0, o];
}
function $varint_decode_i64(buf, offset) {
    var _a = __read(DecodeVarBigInt(buf, offset), 2), v = _a[0], o = _a[1];
    return [v, o];
}
function $varint_decode_u64(buf, offset) {
    var _a = __read(DecodeVarBigInt(buf, offset), 2), v = _a[0], o = _a[1];
    return [BigInt.asUintN(64, v), o];
}
function EncodeVarBigInt(dst, offset, value) {
    value = BigInt.asUintN(64, value);
    while (value > BigInt(127)) {
        dst[offset++] = Number(value & BigInt(127)) | 128;
        value >>= BigInt(7);
    }
    dst[offset++] = Number(value);
    return offset;
}
function $varint_encode(dst, offset, value) {
    if (typeof value === "bigint") {
        offset = EncodeVarBigInt(dst, offset, value);
    }
    else {
        if (value < 0) {
            // NOTE: Protocol Buffers signed varint encoding uses two's complement of 64-bit unsigned integers.
            offset = EncodeVarBigInt(dst, offset, BigInt(value));
        }
        else {
            offset = EncodeVarNumber(dst, offset, value);
        }
    }
    return offset;
}
//# sourceMappingURL=$varint.js.map