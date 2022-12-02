import TSON from "../../../src";
import { NativeAlias } from "../../structures/NativeAlias";
import { _test_clone } from "../internal/_test_clone";

export const test_clone_NativeAlias = _test_clone(
    "NativeAlias",
    NativeAlias.generate,
    (input) => TSON.clone(input),
);
