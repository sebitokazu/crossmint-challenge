import dotenv from "dotenv";
import MegaverseApi from "./megaverse.api";
import { Color, Coordinate, Direction } from "./types";
import { RateLimitQueue } from "./rateLimitQueue";
import { parseAstralObject } from "./utils";

dotenv.config();

let megaverseApi: MegaverseApi;

async function phase1() {
  console.log("Starting phase 1");

  const grid = await megaverseApi.getGoalMap();

  const rowSize = grid.length;
  const columnSize = grid[0].length;

  let row = 0;
  let found = false;
  while (!found && row < rowSize / 2) {
    if (grid[row][row] === "POLYANET") {
      found = true;
    } else {
      row++;
    }
  }

  if (!found) {
    throw new Error("No polyanet found in the main diagonal");
  }

  // get the rows and columns of the polyanets in the main diagonal and cross diagonal
  const polyanetsCoordinates: Coordinate[] = [];
  for (let i = row; i < rowSize - row; i++) {
    polyanetsCoordinates.push({ row: i, column: i });
    if (i !== rowSize - i - 1)
      polyanetsCoordinates.push({ row: i, column: columnSize - i - 1 });
  }

  const rateLimitQueue = new RateLimitQueue(1000);

  for (const coordinate of polyanetsCoordinates) {
    rateLimitQueue.addToQueue(
      async () => {
        await megaverseApi.postPolyanet(coordinate.row, coordinate.column);
        console.log(
          `Posted polyanet at ${coordinate.row}, ${coordinate.column}`
        );
      },
      (e) => {
        console.error(
          `Error posting polyanet at ${coordinate.row}, ${coordinate.column}`,
          e
        );
      }
    );
  }

  while (rateLimitQueue.isRunning()) {
    await new Promise((resolve) => setTimeout(resolve, 1500));
  }

  console.log("Finished phase 1");
}

async function phase2() {
  console.log("Starting phase 2");

  const grid = await megaverseApi.getGoalMap();

  const rowSize = grid.length;
  const columnSize = grid[0].length;

  const rateLimitQueue = new RateLimitQueue(1000);

  //iterate the grid and log elements that are not SPACE
  for (let row = 0; row < rowSize; row++) {
    for (let column = 0; column < columnSize; column++) {
      if (grid[row][column] !== "SPACE") {
        const definition = parseAstralObject(grid[row][column]);
        rateLimitQueue.addToQueue(
          async () => {
            await megaverseApi.postAstralObject(
              definition.type,
              row,
              column,
              definition.metadata
            );
            console.log(`Posted ${definition.type} ${definition.metadata ? definition.metadata : ''} at ${row}, ${column} `);
          },
          () => {
            console.error(
              `Error posting ${definition.type} ${definition.metadata ? definition.metadata : ''} at ${row}, ${column}`
            );
          }
        );
      }
    }
  }

  while (rateLimitQueue.isRunning()) {
    await new Promise((resolve) => setTimeout(resolve, 1500));
  }

  console.log("Finished phase 2");
}

async function main() {
  const candidateId = process.env.CANDIDATE_ID;
  if (!candidateId) {
    throw new Error("CANDIDATE_ID is not set");
  }

  megaverseApi = new MegaverseApi(candidateId);

  // To trim first 2 elements
  const arg = process.argv.slice(2);

  if (arg.length === 0) {
    throw new Error("Please indicate the phase to run. Options: 1 or 2");
  } else {
    try {
      switch (arg[0]) {
        case "goal":
          const goalMap = await megaverseApi.getGoalMap();
          console.log(goalMap);
          break;
        case "1":
          await phase1();
          break;
        case "2":
          await phase2();
          break;
        case "help":
          console.log("Available phases options: 1 or 2");
          break;
        default:
          throw new Error("Please indicate the phase to run. Options: 1 or 2");
      }
    } catch (error: any) {
      console.error(error.message);
    }
  }
}

main();
