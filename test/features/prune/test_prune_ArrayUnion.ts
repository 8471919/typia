import typia from "../../../src";

import { ArrayUnion } from "../../structures/ArrayUnion";
import { _test_prune } from "../../internal/_test_prune";

export const test_prune_ArrayUnion = _test_prune(
    "ArrayUnion",
    ArrayUnion.generate,
    (input) => typia.prune(input),
);
