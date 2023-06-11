import typia from "../../../src";

import { TagArray } from "../../structures/TagArray";
import { _test_clone } from "../../internal/_test_clone";

export const test_clone_TagArray = _test_clone(
    "TagArray",
    TagArray.generate,
    (input) => typia.clone(input),
);
