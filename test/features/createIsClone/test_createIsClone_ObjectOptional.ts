import TSON from "../../../src";
import { ObjectOptional } from "../../structures/ObjectOptional";
import { _test_isClone } from "../internal/_test_isClone";

export const test_createIsClone_ObjectOptional = _test_isClone(
    "ObjectOptional",
    ObjectOptional.generate,
    TSON.createIsClone<ObjectOptional>(),
    ObjectOptional.SPOILERS,
);
