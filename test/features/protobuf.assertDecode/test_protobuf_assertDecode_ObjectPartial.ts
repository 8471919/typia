import typia from "../../../src";
import { _test_protobuf_assertDecode } from "../../internal/_test_protobuf_assertDecode";
import { ObjectPartial } from "../../structures/ObjectPartial";

export const test_protobuf_assertDecode_ObjectPartial =
    _test_protobuf_assertDecode("ObjectPartial")<ObjectPartial>(ObjectPartial)({
        assertDecode: (input) =>
            typia.protobuf.assertDecode<ObjectPartial>(input),
        encode: typia.protobuf.createEncode<ObjectPartial>(),
    });
