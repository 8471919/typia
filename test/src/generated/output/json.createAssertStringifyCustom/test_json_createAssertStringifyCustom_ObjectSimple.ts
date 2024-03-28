import typia from "typia";

import { CustomGuardError } from "../../../internal/CustomGuardError";
import { _test_json_assertStringify } from "../../../internal/_test_json_assertStringify";
import { ObjectSimple } from "../../../structures/ObjectSimple";

export const test_json_createAssertStringifyCustom_ObjectSimple =
  _test_json_assertStringify(CustomGuardError)("ObjectSimple")<ObjectSimple>(
    ObjectSimple,
  )(
    (
      input: any,
      errorFactory: (p: import("typia").TypeGuardError.IProps) => Error = (p) =>
        new CustomGuardError(p),
    ): string => {
      const assert = (
        input: any,
        errorFactory?: (p: import("typia").TypeGuardError.IProps) => Error,
      ): ObjectSimple => {
        const __is = (input: any): input is ObjectSimple => {
          return (
            "object" === typeof input &&
            null !== input &&
            "object" === typeof (input as any).scale &&
            null !== (input as any).scale &&
            "number" === typeof ((input as any).scale as any).x &&
            Number.isFinite(((input as any).scale as any).x) &&
            "number" === typeof ((input as any).scale as any).y &&
            Number.isFinite(((input as any).scale as any).y) &&
            "number" === typeof ((input as any).scale as any).z &&
            Number.isFinite(((input as any).scale as any).z) &&
            "object" === typeof (input as any).position &&
            null !== (input as any).position &&
            "number" === typeof ((input as any).position as any).x &&
            Number.isFinite(((input as any).position as any).x) &&
            "number" === typeof ((input as any).position as any).y &&
            Number.isFinite(((input as any).position as any).y) &&
            "number" === typeof ((input as any).position as any).z &&
            Number.isFinite(((input as any).position as any).z) &&
            "object" === typeof (input as any).rotate &&
            null !== (input as any).rotate &&
            "number" === typeof ((input as any).rotate as any).x &&
            Number.isFinite(((input as any).rotate as any).x) &&
            "number" === typeof ((input as any).rotate as any).y &&
            Number.isFinite(((input as any).rotate as any).y) &&
            "number" === typeof ((input as any).rotate as any).z &&
            Number.isFinite(((input as any).rotate as any).z) &&
            "object" === typeof (input as any).pivot &&
            null !== (input as any).pivot &&
            "number" === typeof ((input as any).pivot as any).x &&
            Number.isFinite(((input as any).pivot as any).x) &&
            "number" === typeof ((input as any).pivot as any).y &&
            Number.isFinite(((input as any).pivot as any).y) &&
            "number" === typeof ((input as any).pivot as any).z &&
            Number.isFinite(((input as any).pivot as any).z)
          );
        };
        if (false === __is(input))
          ((
            input: any,
            _path: string,
            _exceptionable: boolean = true,
          ): input is ObjectSimple => {
            const $guard = (typia.json.createAssertStringify as any).guard;
            const $ao0 = (
              input: any,
              _path: string,
              _exceptionable: boolean = true,
            ): boolean =>
              (((("object" === typeof input.scale && null !== input.scale) ||
                $guard(
                  _exceptionable,
                  {
                    path: _path + ".scale",
                    expected: "ObjectSimple.IPoint3D",
                    value: input.scale,
                  },
                  errorFactory,
                )) &&
                $ao1(input.scale, _path + ".scale", true && _exceptionable)) ||
                $guard(
                  _exceptionable,
                  {
                    path: _path + ".scale",
                    expected: "ObjectSimple.IPoint3D",
                    value: input.scale,
                  },
                  errorFactory,
                )) &&
              (((("object" === typeof input.position &&
                null !== input.position) ||
                $guard(
                  _exceptionable,
                  {
                    path: _path + ".position",
                    expected: "ObjectSimple.IPoint3D",
                    value: input.position,
                  },
                  errorFactory,
                )) &&
                $ao1(
                  input.position,
                  _path + ".position",
                  true && _exceptionable,
                )) ||
                $guard(
                  _exceptionable,
                  {
                    path: _path + ".position",
                    expected: "ObjectSimple.IPoint3D",
                    value: input.position,
                  },
                  errorFactory,
                )) &&
              (((("object" === typeof input.rotate && null !== input.rotate) ||
                $guard(
                  _exceptionable,
                  {
                    path: _path + ".rotate",
                    expected: "ObjectSimple.IPoint3D",
                    value: input.rotate,
                  },
                  errorFactory,
                )) &&
                $ao1(
                  input.rotate,
                  _path + ".rotate",
                  true && _exceptionable,
                )) ||
                $guard(
                  _exceptionable,
                  {
                    path: _path + ".rotate",
                    expected: "ObjectSimple.IPoint3D",
                    value: input.rotate,
                  },
                  errorFactory,
                )) &&
              (((("object" === typeof input.pivot && null !== input.pivot) ||
                $guard(
                  _exceptionable,
                  {
                    path: _path + ".pivot",
                    expected: "ObjectSimple.IPoint3D",
                    value: input.pivot,
                  },
                  errorFactory,
                )) &&
                $ao1(input.pivot, _path + ".pivot", true && _exceptionable)) ||
                $guard(
                  _exceptionable,
                  {
                    path: _path + ".pivot",
                    expected: "ObjectSimple.IPoint3D",
                    value: input.pivot,
                  },
                  errorFactory,
                ));
            const $ao1 = (
              input: any,
              _path: string,
              _exceptionable: boolean = true,
            ): boolean =>
              (("number" === typeof input.x && Number.isFinite(input.x)) ||
                $guard(
                  _exceptionable,
                  {
                    path: _path + ".x",
                    expected: "number",
                    value: input.x,
                  },
                  errorFactory,
                )) &&
              (("number" === typeof input.y && Number.isFinite(input.y)) ||
                $guard(
                  _exceptionable,
                  {
                    path: _path + ".y",
                    expected: "number",
                    value: input.y,
                  },
                  errorFactory,
                )) &&
              (("number" === typeof input.z && Number.isFinite(input.z)) ||
                $guard(
                  _exceptionable,
                  {
                    path: _path + ".z",
                    expected: "number",
                    value: input.z,
                  },
                  errorFactory,
                ));
            return (
              ((("object" === typeof input && null !== input) ||
                $guard(
                  true,
                  {
                    path: _path + "",
                    expected: "ObjectSimple.IBox3D",
                    value: input,
                  },
                  errorFactory,
                )) &&
                $ao0(input, _path + "", true)) ||
              $guard(
                true,
                {
                  path: _path + "",
                  expected: "ObjectSimple.IBox3D",
                  value: input,
                },
                errorFactory,
              )
            );
          })(input, "$input", true);
        return input;
      };
      const stringify = (input: ObjectSimple): string => {
        const $io1 = (input: any): boolean =>
          "number" === typeof input.x &&
          "number" === typeof input.y &&
          "number" === typeof input.z;
        const $number = (typia.json.createAssertStringify as any).number;
        return `{"scale":${`{"x":${$number(((input as any).scale as any).x)},"y":${$number(((input as any).scale as any).y)},"z":${$number(((input as any).scale as any).z)}}`},"position":${`{"x":${$number(((input as any).position as any).x)},"y":${$number(((input as any).position as any).y)},"z":${$number(((input as any).position as any).z)}}`},"rotate":${`{"x":${$number(((input as any).rotate as any).x)},"y":${$number(((input as any).rotate as any).y)},"z":${$number(((input as any).rotate as any).z)}}`},"pivot":${`{"x":${$number(((input as any).pivot as any).x)},"y":${$number(((input as any).pivot as any).y)},"z":${$number(((input as any).pivot as any).z)}}`}}`;
      };
      return stringify(assert(input, errorFactory));
    },
  );
