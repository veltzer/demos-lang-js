# TOFIX

Findings from a code scan on 2026-10-04.

## High

- `src/libraries/dojo/ajax.html:8` - every library demo loads its toolkit through a relative path that does not resolve: `toolkits/` lives at the repo root, but the pages use `../toolkits/...` from `src/libraries/<lib>/` (dojo, jquery_controls, jquery_mobile, jquery_ui) or `../../toolkits/...` from `src/libraries/<lib>/<sub>/` (jquery/exercises, prototype/examples, raphael), so about 100 pages load no library at all; fix the depth (or serve `toolkits/` at a stable URL and use an absolute path).
- `src/libraries/extjs/examples/charts/chart.html:12` - all ~50 ExtJS pages load `toolkits/extjs/ext-all.js` and `resources/css/ext-all.css`, but there is no `toolkits/extjs` link at all (only dojo, jquery, jquery-ui, jquery.mobile, prototype and raphael are linked in `toolkits/`); add the link (or a CDN URL), otherwise none of the ExtJS demos run.
- `src/libraries/dojo/tree_lazy.php:9` - `$_GET['path']` is passed straight to `opendir()` and echoed back unescaped, so any client can list any directory on the server (path traversal) and inject into the JSON-like response; restrict it to a base directory (`realpath` + prefix check) and build the response with `json_encode`.

## Medium

- `src/libraries/extjs/examples/pagination/utils.php:90` - the whole helper uses the `mysql_*` API (`mysql_connect`, `mysql_query`, `MYSQL_NUM` ...) that was removed in PHP 7, and `assert_options(ASSERT_QUIET_EVAL, ...)` at line 24 refers to a constant removed in PHP 8, so `paging.php` fails with a fatal error on any current PHP; port it to PDO or mysqli.
- `src/libraries/extjs/examples/pagination/paging.php:28` - `start` and `limit` from `$_GET` are concatenated into the SQL `LIMIT` clause unvalidated (same in `src/libraries/extjs/examples/stores/store_fetch.php:12`), an SQL injection; cast them to `int`.
- `src/libraries/extjs/examples/stores/store_fetch.php:3` - `require('utils.php')`, but `utils.php` exists only in `../pagination/`; fix the path (or move `utils.php` to a shared place).
- `src/core/examples/ajax/ajax.php:2` - the AJAX demo reads and returns `/etc/passwd` to any browser that requests it; serve a file shipped with the demo instead.
- `src/core/examples/html5/solutions/audio/audio.html:26` - audio/video sources point to `../../../media/...` (audio) and `../../../../data/...` / `../../../../resources/media/...` (`solutions/video/video.html:9`, `solutions/video2/video.html:9`), none of which exist; the files (`vivaldi.mp3`, `wtk1.01.prelude.C.*`, `nike-commercial-lebron-rise.mp4`, `TT113.ogv`) are in the `shared-samples` submodule - point the pages there.
- `nodejs/exercises/web_server_fastify/exercise.md:1` - byte-identical copy of the Express exercise ("Web Server using the Express library", `npm add express`); write the Fastify version.
- `src/core/examples/html5/questions/audio/audio.html:17` - the html5 question/solution pages (about 30) link to `account.html`, `main.html` and `prefs.html` in their nav bar, none of which exist anywhere in the repo; drop the nav links or add the pages.

## Low

- `src/features/svg/raphael_demo.html:6` - loads `../toolkits/raphael-min.js`; the linked file is `toolkits/raphael.min.js` (and the depth is wrong, see above).
- `src/libraries/extjs/exercises/threecombobox2.html:6` - loads `../../../toolkits/extjs/myext-all.js` while its CSS and `threecombobox.html` use `../../`; neither `myext-all.js` nor `toolkits/extjs` exist.
- `rsconstruct.toml:56` - the comments here and at line 96 say `toolkits/` holds vendored libraries, but every entry is a symlink into `/usr/share/javascript` (Debian `libjs-*` packages), which is why the demos only work on a machine with those packages; say so in the comment and in `toolkits/README.txt`.
- `rsconstruct.toml:28` - `ruff`/`mypy` (line 33) and `shellcheck` (line 39) list `config` in `src_dirs`, but `config/` holds only `.lua` files; drop it.
- `support/pyrelist.json:1` - pattern list for pyrelist, but nothing runs pyrelist on this repo (no processor in `rsconstruct.toml`, no script references the file); wire it into the build or delete it.
- `doc/TODO.txt:1` - refers to `scripts/run_*` scripts that no longer exist; and `doc/linters.txt:3` lists jshint/jslint, which the build does not run (only oxlint does) - update both.
- `pyproject.toml:12` - `pytest` is in the dev group but the repo has no tests and no pytest processor; drop it.
