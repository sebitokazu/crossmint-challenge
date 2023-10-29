import axios, { AxiosInstance } from "axios";
import { BaseAstral, Color, Direction, MegaverseMap } from "./types";

class MegaverseApi {
  private axiosInstance: AxiosInstance;

  constructor(private candidateId: string) {
    this.axiosInstance = axios.create({
      baseURL: `https://challenge.crossmint.io/api`,
    });
  }

  async postAstralObject(
    type: Omit<BaseAstral, "SPACE">,
    row: number,
    column: number,
    metadata?: Color | Direction
  ): Promise<void> {
    switch (type) {
      case "POLYANET":
        await this.postPolyanet(row, column);
        break;
      case "SOLOON":
        await this.postSoloon(row, column, metadata as Color);
        break;
      case "COMETH":
        await this.postCometh(row, column, metadata as Direction);
        break;
      default:
        throw new Error("Unknown astral object");
    }
  }

  async postPolyanet(row: number, column: number): Promise<void> {
    await this.post("/polyanets", { row, column });
  }

  async deletePolyanet(row: number, column: number): Promise<void> {
    await this.delete("/polyanets", { row, column });
  }

  async postSoloon(row: number, column: number, color: Color): Promise<void> {
    await this.post("/soloons", { row, column, color });
  }

  async deleteSoloon(row: number, column: number): Promise<void> {
    await this.delete("/soloons", { row, column });
  }

  async postCometh(
    row: number,
    column: number,
    direction: Direction
  ): Promise<void> {
    await this.post("/comeths", { row, column, direction });
  }

  async deleteCometh(row: number, column: number): Promise<void> {
    await this.delete("/comeths", { row, column });
  }

  async getGoalMap(): Promise<MegaverseMap> {
    const response = await this.axiosInstance.get<{ goal: MegaverseMap }>(
      `/map/${this.candidateId}/goal`
    );
    return response.data.goal;
  }

  //   Private Methods

  private async post(url: string, data: any): Promise<void> {
    await this.axiosInstance.post(url, {
      ...data,
      candidateId: this.candidateId,
    });
  }

  private async delete(url: string, params: any): Promise<void> {
    await this.axiosInstance.delete(url, {
      data: { ...params, candidateId: this.candidateId },
    });
  }
}

export default MegaverseApi;
