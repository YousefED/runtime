import tape from "tape-await";
import {runtime as createRuntime} from "../";
import "./requestAnimationFrame";
import valueof from "./valueof";

tape("variable.define detects duplicate declarations", async test => {
  const runtime = createRuntime();
  const module = runtime.module();
  const v1 = module.variable().define("foo", [], 1);
  const v2 = module.variable().define("foo", [], 2);
  const v3 = module.variable().define(null, ["foo"], foo => foo);
  await new Promise(setImmediate);
  test.deepEqual(await valueof(v1), {error: "foo is defined more than once"});
  test.deepEqual(await valueof(v2), {error: "foo is defined more than once"});
  test.deepEqual(await valueof(v3), {error: "foo is defined more than once"});
});