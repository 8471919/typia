import TSON from "../../../../src";
import { ClassGetter } from "../../../structures/ClassGetter";
import { _test_application } from "../../internal/_test_application";

export const test_application_swagger_ClassGetter = _test_application(
    "swagger",
)("ClassGetter", TSON.application<[ClassGetter], "swagger">(), {
    schemas: [
        {
            $ref: "#/components/schemas/ClassGetter.Person",
        },
    ],
    components: {
        schemas: {
            "ClassGetter.Person": {
                type: "object",
                properties: {
                    id: {
                        type: "string",
                        nullable: false,
                        "x-tson-required": true,
                    },
                    name: {
                        type: "string",
                        nullable: false,
                        "x-tson-required": true,
                    },
                    dead: {
                        type: "boolean",
                        nullable: true,
                        "x-tson-required": true,
                    },
                },
                nullable: false,
                required: ["id", "name", "dead"],
                "x-tson_jsDocTags": [],
            },
        },
    },
    purpose: "swagger",
    prefix: "#/components/schemas",
});
