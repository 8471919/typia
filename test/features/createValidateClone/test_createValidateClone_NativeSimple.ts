import typia from "../../../src";

import { NativeSimple } from "../../structures/NativeSimple";
import { _test_validateClone } from "../../internal/_test_validateClone";

export const test_createValidateClone_NativeSimple = _test_validateClone(
    "NativeSimple",
    NativeSimple.generate,
    typia.createValidateClone<NativeSimple>(),
    NativeSimple.SPOILERS,
);
