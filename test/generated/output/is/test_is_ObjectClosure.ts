import typia from "../../../../src";
import { _test_is } from "../../../internal/_test_is";
import { ObjectClosure } from "../../../structures/ObjectClosure";

export const test_is_ObjectClosure = _test_is<ObjectClosure>(ObjectClosure)(
    (input) =>
        ((input: any): input is ObjectClosure => {
            const $io0 = (input: any): boolean =>
                "string" === typeof input.id &&
                "function" === typeof input.open;
            return "object" === typeof input && null !== input && $io0(input);
        })(input),
);
