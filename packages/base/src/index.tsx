import { Component2 } from "@base/components/Component2";
import React from "react";

import image from './test.png';

export function HelloWorld() {
  return <div><img src={image} width={100} />Hello World from Base Component <Component2/></div>;
}
