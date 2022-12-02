import TSON from "../../../src";
import { ObjectGenericArray } from "../../structures/ObjectGenericArray";
import { _test_isClone } from "../internal/_test_isClone";

export const test_isClone_ObjectGenericArray = _test_isClone(
    "ObjectGenericArray",
    ObjectGenericArray.generate,
    (input) => TSON.isClone(input),
    ObjectGenericArray.SPOILERS,
);
