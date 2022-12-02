import TSON from "../../../src";
import { AtomicSimple } from "../../structures/AtomicSimple";
import { _test_equals } from "../internal/_test_equals";

export const test_equals_AtomicSimple = _test_equals(
    "AtomicSimple",
    AtomicSimple.generate,
    (input) => TSON.equals(input),
);
