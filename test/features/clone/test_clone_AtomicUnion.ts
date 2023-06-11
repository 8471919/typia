import typia from "../../../src";

import { AtomicUnion } from "../../structures/AtomicUnion";
import { _test_clone } from "../../internal/_test_clone";

export const test_clone_AtomicUnion = _test_clone(
    "AtomicUnion",
    AtomicUnion.generate,
    (input) => typia.clone(input),
);
