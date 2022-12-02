import TSON from "../../../src";
import { ObjectOptional } from "../../structures/ObjectOptional";
import { _test_assertClone } from "../internal/_test_assertClone";

export const test_createAssertClone_ObjectOptional = _test_assertClone(
    "ObjectOptional",
    ObjectOptional.generate,
    TSON.createAssertClone<ObjectOptional>(),
    ObjectOptional.SPOILERS,
);
