import typia from "typia";

import { _test_protobuf_assertEncode } from "../../internal/_test_protobuf_assertEncode";
import { ObjectSimple } from "../../structures/ObjectSimple";

import { TypeGuardError } from "typia";

export const test_protobuf_assertEncode_ObjectSimple =
  _test_protobuf_assertEncode(TypeGuardError)("ObjectSimple")<ObjectSimple>(
    ObjectSimple,
  )({
    encode: (input) => typia.protobuf.assertEncode<ObjectSimple>(input),
    decode: typia.protobuf.createDecode<ObjectSimple>(),
    message: typia.protobuf.message<ObjectSimple>(),
  });
