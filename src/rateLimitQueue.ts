import axios, { AxiosResponse } from "axios";

export class RateLimitQueue {
  private queue: (() => Promise<boolean>)[] = [];

  constructor(private sleepInterval: number) {}

  async addToQueue(
    requestFunction: () => Promise<void>,
    errorCallback: (e: any) => void
  ) {
    const task = async () => {
      try {
        await requestFunction();
      } catch (error: any) {
        if (axios.isAxiosError(error) && error.response?.status === 429) {
          console.log(
            "Received a 429 error. Sleeping for",
            this.sleepInterval,
            "ms"
          );
          await new Promise((resolve) =>
            setTimeout(resolve, this.sleepInterval)
          );

          return false;
        } else {
          errorCallback(error);
        }
      }
      return true;
    };

    this.queue.push(task);
  }

  isQueueEmpty() {
    return this.queue.length == 0;
  }

  async startProcessing() {
    await this.processQueue();
  }

  private async processQueue() {
    let success = false;
    while (this.queue.length > 0) {
      const task = this.queue.shift();
      if (task) {
        success = await task();
        if (!success) {
          this.queue.unshift(task);
        }
      }
    }
  }
}
