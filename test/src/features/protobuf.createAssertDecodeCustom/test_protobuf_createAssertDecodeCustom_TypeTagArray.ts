import typia from "typia";

import { _test_protobuf_assertDecode } from "../../internal/_test_protobuf_assertDecode";
import { TypeTagArray } from "../../structures/TypeTagArray";

import { CustomGuardError } from "../../internal/CustomGuardError";

export const test_protobuf_createAssertDecodeCustom_TypeTagArray =
  _test_protobuf_assertDecode(CustomGuardError)("TypeTagArray")<TypeTagArray>(
    TypeTagArray,
  )({
    decode: typia.protobuf.createAssertDecode<TypeTagArray>(
      (p) => new CustomGuardError(p),
    ),
    encode: typia.protobuf.createEncode<TypeTagArray>(),
  });
