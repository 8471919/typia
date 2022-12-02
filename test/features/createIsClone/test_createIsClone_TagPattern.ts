import TSON from "../../../src";
import { TagPattern } from "../../structures/TagPattern";
import { _test_isClone } from "../internal/_test_isClone";

export const test_createIsClone_TagPattern = _test_isClone(
    "TagPattern",
    TagPattern.generate,
    TSON.createIsClone<TagPattern>(),
    TagPattern.SPOILERS,
);
