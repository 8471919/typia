import TSON from "../../../src";
import { NativeSimple } from "../../structures/NativeSimple";
import { _test_assertClone } from "../internal/_test_assertClone";

export const test_createAssertClone_NativeSimple = _test_assertClone(
    "NativeSimple",
    NativeSimple.generate,
    TSON.createAssertClone<NativeSimple>(),
    NativeSimple.SPOILERS,
);
