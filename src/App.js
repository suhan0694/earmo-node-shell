const fs = require("fs");
const { spawn } = require("child_process");
const lineReplace = require("line-replace");
const prompt = require("prompt-sync")({ sigint: true });
const copydir = require("copy-dir");
const mv = require("mv");

const copyEarmoFolder = new Promise((resolve, reject) => {
  copydir(
    "./earmo_files/earmo_executable/",
    "./Output/earmo_executable/",
    {
      utimes: true, // keep add time and modify time
      mode: true, // keep file mode
      cover: true, // cover file when exists, default is true
    },
    function (err) {
      if (err) return reject(err);
      return resolve("Copying Done");
    }
  );
});

const runBatchFiles = new Promise((resolve, reject) => {
  var bat = require.resolve("../earmo_files/dex2jar-2.0/d2j-dex2jar.bat");
  var apk = require.resolve("../earmo_files/dex2jar-2.0/ensichat_17.apk");
  var ls = spawn(bat, [apk]);

  ls.stdout.on("data", (data) => {
    console.log(data.toString());
  });

  ls.stderr.on("data", (data) => {
    console.error(data.toString());
  });

  ls.on("exit", (code) => {
    return resolve(`Child exited with code ${code}`);
  });
});

const callAutomator = async () => {
  const earmoMvresp = await copyEarmoFolder;
  const runBtcFiles = await runBatchFiles;
};

callAutomator()
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.log(error);
  });

// const independentRuns = prompt("Number of independent runs: ");

// lineReplace({
//   file: "./RefactoringStandarStudyAndroid.prop",
//   line: 26,
//   text: `independentRuns=${independentRuns}`,
//   addNewLine: true,
//   callback: ({ file, line, text, replacedText }) => {
//     const e0 = prompt("E0 value: ");
//     replaceE0(e0);
//   },
// });

// const replaceE0 = (e0) => {
//   lineReplace({
//     file: "./RefactoringStandarStudyAndroid.prop",
//     line: 30,
//     text: `originalAppEnergyUsage=${e0}`,
//     addNewLine: true,
//     callback: ({ file, line, text, replacedText }) => {
//       moveFilesForEarmo();
//     },
//   });
// };

// const moveFilesForEarmo = () => {
//   mv(
//     "./ensichat_17-dex2jar.jar",
//     "./Output/earmo_executable/ensichat_17-dex2jar.jar",
//     function (err) {
//       console.log(err);
//     }
//   );
//   fs.copyFile(
//     "./RefactoringStandarStudyAndroid.prop",
//     "./Output/earmo_executable/RefactoringStandarStudyAndroid.prop",
//     function (error) {
//       console.log(error);
//     }
//   );
// };
