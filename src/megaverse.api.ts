import axios, { AxiosInstance } from "axios";
import { MegaverseMap } from "./types";

class MegaverseApi {
  private axiosInstance: AxiosInstance;

  constructor(private candidateId: string) {
    this.axiosInstance = axios.create({
      baseURL: `https://challenge.crossmint.io/api`,
    });
  }

  async postPolyanet(row: number, column: number): Promise<void> {
    await this.post("/polyanets", { row, column });
  }

  async deletePolyanet(row: number, column: number): Promise<void> {
    await this.delete("/polyanets", { row, column });
  }

  async postSoloon(row: number, column: number, color: string): Promise<void> {
    await this.post("/soloons", { row, column, color });
  }

  async deleteSoloon(row: number, column: number): Promise<void> {
    await this.delete("/soloons", { row, column });
  }

  async postCometh(
    row: number,
    column: number,
    direction: string
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
      params: { ...params, candidateId: this.candidateId },
    });
  }
}

export default MegaverseApi;
