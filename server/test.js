// https://nodejs.org/docs/latest/api/child_process.html#child_process_child_process_exec_command_options_callback
// CONTAINER ID        IMAGE                     COMMAND                  CREATED             STATUS                      PORTS               NAMES               SIZE
// 69e9467c072f        25a777227516              "/bin/sh -c 'npm ins…"   2 hours ago         Exited (1) 2 hours ago                          agitated_wright     20.2MB (virtual 697MB)
// 2dce23a5aea3        25a777227516              "/bin/sh -c 'npm ci'"    2 hours ago         Exited (1) 2 hours ago                          fervent_jackson     55B (virtual 677MB)
// 46cc7c5b35f6        6495251b8a13              "/bin/sh -c 'npm ci'"    2 hours ago         Exited (1) 2 hours ago                          sweet_bhaskara      227MB (virtual 1.12GB)
// 2981b61d54c3        b826d251321b              "/bin/sh -c 'apt-get…"   2 hours ago         Exited (100) 2 hours ago                        recursing_taussig   0B (virtual 897MB)
// fe18ed154f09        b826d251321b              "/bin/sh -c 'apt-get…"   2 hours ago         Exited (100) 2 hours ago                        loving_ishizaka     0B (virtual 897MB)
// 1360105d53f1        288d2f688643              "/bin/sh -c 'apt-get…"   2 hours ago         Exited (127) 2 hours ago                        sad_galileo         0B (virtual 70.7MB)
// e8036780ddd6        5a2f4c5fa82a              "/bin/sh -c 'npm ci'"    2 hours ago         Exited (1) 2 hours ago                          musing_chaum        139MB (virtual 210MB)
// eb2e77521000        93dab783417f              "/bin/sh -c 'npm ci'"    3 hours ago         Exited (1) 3 hours ago                          pedantic_bouman     152MB (virtual 223MB)
// fd7b4069307f        540a289bab6c              "nginx -g 'daemon of…"   26 hours ago        Exited (1) 26 hours ago                         http_server         0B (virtual 126MB)
// db7ff0baecbf        9a63953398d8              "docker-entrypoint.s…"   26 hours ago        Exited (137) 22 hours ago                       scanx_app           110B (virtual 634MB)
// 57445e48a67a        mongo:latest              "docker-entrypoint.s…"   26 hours ago        Exited (0) 6 hours ago                          scanx_files_db      0B (virtual 363MB)
// e724e2099ce4        redata/scanx:0.5.191211   "python app.py"          26 hours ago        Exited (137) 22 hours ago                       redata-scanx        1.38MB (virtual 1.16GB)

// CONTAINER ID        IMAGE                     COMMAND                  CREATED             STATUS                      PORTS               NAMES               SIZE
// 0                   19                        45                       70                  90                          118                 138                 158

const util = require('util');
const exec = require('child_process').exec;
const asyncExec = util.promisify(exec);

async function psExample() {

  const result = [];
  const { stdout } = await asyncExec('docker ps --all --size --no-trunc');

  const lines = stdout.split('\n');
  const pos = determinePositions(lines[0]);
  if (!pos) {
    return;
  }

  lines.forEach((line, index) => {
    if (line.trim() === '') {
      return;
    }
    console.log(line);

    const data = {
      containerID: line.slice(0, pos.imageID).trim(),
      imageID: line.slice(pos.imageID, pos.command).trim(),
      command: line.slice(pos.command, pos.created).trim(),
      created: line.slice(pos.created, pos.status).trim(),
      status: line.slice(pos.status, pos.ports).trim(),
      ports: line.slice(pos.ports, pos.name).trim(),
      name: line.slice(pos.name, pos.size).trim(),
      size: line.slice(pos.size).trim(),
    };

    result.push(data);
  });

  console.log(result);
}

function determinePositions(line) {
  if (line.trim() === '') {
    return null;
  }

  return {
    containerID: line.indexOf('CONTAINER ID'),
    imageID: line.indexOf('IMAGE'),
    command: line.indexOf('COMMAND'),
    created: line.indexOf('CREATED'),
    status: line.indexOf('STATUS'),
    ports: line.indexOf('PORTS'),
    name: line.indexOf('NAMES'),
    size: line.indexOf('SIZE'),
  };
}

psExample();
