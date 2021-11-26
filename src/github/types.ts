export type Actor = {
  id: number;
  login: string;
  display_login: string;
  gravatar_id: string;
  url: string;
  avatar_url: string;
};

export type Repository = {
  id: number;
  name: string;
  url: string;
};

export type Commit = {
  sha: string;
  author: { email: string; name: string };
  message: string;
  distinct: boolean;
  url: string;
};

export namespace Payload {
  export type PushEvent = {
    push_id: 8475821598;
    size: 1;
    distinct_size: 1;
    ref: 'refs/heads/master';
    head: '87586562bab78cf8bc412094a4537206cd44c625';
    before: '23e52c5abe23e9bffc883a437e2a1b1ab6ed49f8';
    commits: Commit[];
  };

  export type CreateEvent = {
    ref: null;
    ref_type: 'repository';
    master_branch: 'main';
    description: 'Repo para estudos sobre puppteer';
    pusher_type: 'user';
  };
}

export type Event =
  | {
      id: string;
      type: 'PushEvent';
      actor: Actor;
      repo: Repository;
      payload: Payload.PushEvent;
      public: boolean;
      created_at: string;
    }
  | {
      id: string;
      type: 'CreateEvent';
      actor: Actor;
      repo: Repository;
      payload: Payload.CreateEvent;
      public: boolean;
      created_at: string;
    };

export namespace ListTodayCommits {
  export type Model = {
    username: string;
    message: string;
    url: string;
  };
}
