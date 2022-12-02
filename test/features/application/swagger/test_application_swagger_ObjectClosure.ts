import TSON from "../../../../src";
import { ObjectClosure } from "../../../structures/ObjectClosure";
import { _test_application } from "../../internal/_test_application";

export const test_application_swagger_ObjectClosure = _test_application(
    "swagger",
)("ObjectClosure", TSON.application<[ObjectClosure], "swagger">(), {
    schemas: [
        {
            $ref: "#/components/schemas/ObjectClosure.IRecord",
        },
    ],
    components: {
        schemas: {
            "ObjectClosure.IRecord": {
                type: "object",
                properties: {
                    id: {
                        type: "string",
                        nullable: false,
                        "x-tson-required": true,
                    },
                },
                nullable: false,
                required: ["id"],
                "x-tson_jsDocTags": [],
            },
        },
    },
    purpose: "swagger",
    prefix: "#/components/schemas",
});
