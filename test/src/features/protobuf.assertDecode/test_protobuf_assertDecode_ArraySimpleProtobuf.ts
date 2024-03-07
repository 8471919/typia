import typia from "typia";

import { _test_protobuf_assertDecode } from "../../internal/_test_protobuf_assertDecode";
import { ArraySimpleProtobuf } from "../../structures/ArraySimpleProtobuf";

import { TypeGuardError } from "typia";

export const test_protobuf_assertDecode_ArraySimpleProtobuf =
  _test_protobuf_assertDecode(TypeGuardError)(
    "ArraySimpleProtobuf",
  )<ArraySimpleProtobuf>(ArraySimpleProtobuf)({
    decode: (input) => typia.protobuf.assertDecode<ArraySimpleProtobuf>(input),
    encode: typia.protobuf.createEncode<ArraySimpleProtobuf>(),
  });
