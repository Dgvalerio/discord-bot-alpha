import { GithubController } from './controller';

(async () => {
  const github = new GithubController();

  const a = await github.listTodayCommits('dgvalerio');

  console.table(a);
})();
