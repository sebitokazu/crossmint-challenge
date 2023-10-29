import { AstralObject, AstralObjectDefinition } from "./types";

export function parseAstralObject(obj: AstralObject): AstralObjectDefinition {
  if (obj === "SPACE" || obj === "POLYANET") {
    return { type: obj };
  } else {
    const [metadata, type] = obj.split("_") as [
      AstralObjectDefinition["metadata"],
      AstralObjectDefinition["type"]
    ];
    return { type, metadata };
  }
}
