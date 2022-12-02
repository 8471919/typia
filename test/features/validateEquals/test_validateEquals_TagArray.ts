import TSON from "../../../src";
import { TagArray } from "../../structures/TagArray";
import { _test_validateEquals } from "../internal/_test_validateEquals";

export const test_validateEquals_TagArray = _test_validateEquals(
    "TagArray",
    TagArray.generate,
    (input) => TSON.validateEquals(input),
);
