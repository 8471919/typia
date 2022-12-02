import TSON from "../../../src";
import { TagFormat } from "../../structures/TagFormat";
import { _test_assertClone } from "../internal/_test_assertClone";

export const test_createAssertClone_TagFormat = _test_assertClone(
    "TagFormat",
    TagFormat.generate,
    TSON.createAssertClone<TagFormat>(),
    TagFormat.SPOILERS,
);
