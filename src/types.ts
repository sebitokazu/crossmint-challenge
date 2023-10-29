export type Color = "BLUE" | "RED" | "PURPLE" | "WHITE";
export type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";

export type BaseAstral =  "SPACE" | "POLYANET" | "SOLOON" | "COMETH";
export type Space = "SPACE";
export type Polyanet = "POLYANET";
export type Soloon =
  | "BLUE_SOLOON"
  | "RED_SOLOON"
  | "PURPLE_SOLOON"
  | "WHITE_SOLOON";
export type Cometh =
  | "UP_COMETH"
  | "DOWN_COMETH"
  | "LEFT_COMETH"
  | "RIGHT_COMETH";
export type AstralObject = Space | Polyanet | Soloon | Cometh;

export type AstralObjectDefinition = {
  type: BaseAstral;
  metadata?: Color | Direction;
};

export type MegaverseMap = AstralObject[][];

export type Coordinate = {
  row: number;
  column: number;
};
