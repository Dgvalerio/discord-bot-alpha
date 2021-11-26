import axios, { AxiosResponse } from 'axios';

import { Commit, Event, ListTodayCommits, Payload } from './types';

/**
 * @module GithubController
 * */
export class GithubController {
  private axios;

  /**
   * Constructor of GithubController
   * */
  constructor() {
    this.axios = axios.create({ baseURL: 'https://api.github.com' });
  }

  /**
   * Method to list Commits
   * @param {string} user
   * @return {[Appointment.Model]}
   * */
  public async listTodayCommits(
    user: string
  ): Promise<ListTodayCommits.Model[]> {
    const { data: events }: AxiosResponse<Event[]> = await this.axios.get(
      `/users/${user}/events`
    );

    const today = new Date();

    const todayEvents = events.filter(
      (event) => new Date(event.created_at).getDate() === today.getDate()
    );
    const eventsWithCommits = todayEvents.filter(
      (event) => event.type === 'PushEvent'
    );

    let joinedCommits: Commit[] = [];

    eventsWithCommits.forEach((event) => {
      joinedCommits = [
        ...joinedCommits,
        ...(event.payload as Payload.PushEvent).commits,
      ];
    });

    return joinedCommits.map(({ message, url, author }) => ({
      username: author.name,
      message,
      url,
    }));
  }
}
