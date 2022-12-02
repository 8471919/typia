import TSON from "../../../src";
import { ObjectNullable } from "../../structures/ObjectNullable";
import { _test_assertClone } from "../internal/_test_assertClone";

export const test_assertClone_ObjectNullable = _test_assertClone(
    "ObjectNullable",
    ObjectNullable.generate,
    (input) => TSON.assertClone(input),
    ObjectNullable.SPOILERS,
);
