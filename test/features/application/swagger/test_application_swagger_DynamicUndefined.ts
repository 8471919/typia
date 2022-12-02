import TSON from "../../../../src";
import { DynamicUndefined } from "../../../structures/DynamicUndefined";
import { _test_application } from "../../internal/_test_application";

export const test_application_swagger_DynamicUndefined = _test_application(
    "swagger",
)("DynamicUndefined", TSON.application<[DynamicUndefined], "swagger">(), {
    schemas: [
        {
            $ref: "#/components/schemas/DynamicUndefined",
        },
    ],
    components: {
        schemas: {
            DynamicUndefined: {
                type: "object",
                properties: {},
                nullable: false,
                "x-tson_jsDocTags": [],
            },
        },
    },
    purpose: "swagger",
    prefix: "#/components/schemas",
});
