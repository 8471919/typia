import TSON from "../../../src";
import { TagLength } from "../../structures/TagLength";
import { _test_assertStringify } from "../internal/_test_assertStringify";

export const test_assertStringify_TagLength = _test_assertStringify(
    "TagLength",
    TagLength.generate,
    (input) => TSON.assertStringify(input),
    TagLength.SPOILERS,
);
