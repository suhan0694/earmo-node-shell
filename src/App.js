const fs = require("fs");
const { spawn } = require("child_process");
const lineReplace = require("line-replace");
const prompt = require("prompt-sync")({ sigint: true });
const copydir = require("copy-dir");
const mv = require("mv");

const copyEarmoFolderFunc = () => {
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

  return copyEarmoFolder;
};

const runBatchFilesFunc = () => {
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
      console.log(`Child exited with code ${code}`);
    });
  });

  return runBatchFiles;
};

const getIndependentRunsCountFunc = () => {
  const getIndependentRunsCount = new Promise((resolve, reject) => {
    const independentRuns = prompt("Number of independent runs: ");

    lineReplace({
      file: "./RefactoringStandarStudyAndroid.prop",
      line: 26,
      text: `independentRuns=${independentRuns}`,
      addNewLine: true,
      callback: ({ file, line, text, replacedText }) => {
        return resolve("Entered" + independentRuns);
      },
    });
  });

  return getIndependentRunsCount;
};

const getEOValueFunc = () => {
  const getEOValue = new Promise((resolve, reject) => {
    const e0 = prompt("Enter E0 value: ");

    lineReplace({
      file: "./RefactoringStandarStudyAndroid.prop",
      line: 30,
      text: `originalAppEnergyUsage=${e0}`,
      addNewLine: true,
      callback: ({ file, line, text, replacedText }) => {
        return resolve("Entered" + e0);
      },
    });
  });

  return getEOValue;
};

const moveJarFileFunc = () => {
  const moveJarFile = new Promise((resolve, reject) => {
    mv(
      "./ensichat_17-dex2jar.jar",
      "./Output/earmo_executable/ensichat_17-dex2jar.jar",
      function (err) {
        return reject("Moving jar file" + err);
      }
    );
  });
  return moveJarFile;
};

const movePropFileFunc = () => {
  const movePropFile = new Promise((resolve, reject) => {
    fs.copyFile(
      "./RefactoringStandarStudyAndroid.prop",
      "./Output/earmo_executable/RefactoringStandarStudyAndroid.prop",
      function (error) {
        return reject(console.log(error));
      }
    );
  });

  return movePropFile;
};

const callAutomator = async () => {
  const getIdptRunsCount = await getIndependentRunsCountFunc();
  const getEOVal = await getEOValueFunc();
  const earmoMvresp = await copyEarmoFolderFunc();
  const mvJarFile = await moveJarFileFunc();
  const mvPropFile = await movePropFileFunc();
  const runBtcFiles = await runBatchFilesFunc();
};

callAutomator()
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.log(error);
  });
