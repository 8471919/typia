import TSON from "../../../../src";
import { FunctionalProperty } from "../../../structures/FunctionalProperty";
import { _test_application } from "../../internal/_test_application";

export const test_application_ajv_FunctionalProperty = _test_application("ajv")(
    "FunctionalProperty",
    TSON.application<[FunctionalProperty], "ajv">(),
    {
        schemas: [
            {
                $ref: "components#/schemas/FunctionalProperty",
            },
        ],
        components: {
            schemas: {
                FunctionalProperty: {
                    $id: "components#/schemas/FunctionalProperty",
                    type: "object",
                    properties: {
                        name: {
                            type: "string",
                            nullable: false,
                            "x-tson-required": true,
                        },
                    },
                    nullable: false,
                    required: ["name"],
                    "x-tson_jsDocTags": [],
                },
            },
        },
        purpose: "ajv",
        prefix: "components#/schemas",
    },
);
